import { expect, test, type Page } from "@playwright/test";
import { songs } from "../src/data/songs";
import { hymnCatalog, type HymnId } from "../src/data/hymnals";
import { buildListeningQueue } from "../src/lib/listening";

// Test the site's player lifecycle deterministically, without relying on ads,
// geography, login, or third-party availability. Live playback is a separate smoke check.
const mockAPI = `
window.__players = [];
window.YT = { Player: class {
  constructor(target, options) {
    this.options = options;
    this.loads = [options.videoId];
    this.frame = document.createElement('iframe');
    this.frame.srcdoc = '<body style="background:#172630;color:white">YouTube test player</body>';
    target.replaceWith(this.frame);
    window.__players.push(this);
    setTimeout(() => options.events.onReady({ target: this }), 0);
  }
  getIframe() { return this.frame; }
  playVideo() { this.emit('onStateChange', 1); }
  pauseVideo() { this.emit('onStateChange', 2); }
  loadVideoById(id) { this.loads.push(id); this.playVideo(); }
  destroy() { this.destroyed = true; this.frame.remove(); }
  emit(name, data) { this.options.events[name]({ target: this, data }); }
}};
window.onYouTubeIframeAPIReady();
`;

async function emit(page: Page, name: string, data: number) {
  await page.evaluate(({ name, data }) => {
    const mock = window as unknown as { __players: { emit(name: string, data: number): void }[] };
    mock.__players.at(-1)!.emit(name, data);
  }, { name, data });
}

test.beforeEach(async ({ page }) => {
  await page.route("https://www.youtube.com/iframe_api", route => route.fulfill({ contentType: "application/javascript", body: mockAPI }));
});

test("player survives navigation, advances, pauses, replaces its queue, and closes", async ({ page }) => {
  await page.goto("/hymns");
  await page.getByRole("button", { name: "Play all: All Hymns", exact: true }).click();
  const player = page.getByRole("complementary", { name: "Listening player" });
  await expect(player.getByRole("button", { name: "Pause", exact: true })).toBeEnabled();
  await player.getByRole("link").first().click();
  await expect(page).toHaveURL(/\/songs\//);
  await expect(player).toBeVisible();
  expect(await page.evaluate(() => (window as unknown as { __players: unknown[] }).__players.length)).toBe(1);
  await player.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(player.getByRole("button", { name: "Play", exact: true })).toBeVisible();
  await emit(page, "onStateChange", 0);
  await expect(player).toContainText("2 of");
  await player.getByRole("button", { name: "Previous", exact: true }).click();
  await expect(player).toContainText("1 of");
  await page.getByRole("link", { name: "Back to A Royal Army", exact: true }).click();
  await page.getByRole("button", { name: "Shuffle: A Royal Army", exact: true }).click();
  await expect(player.getByRole("button", { name: "Pause", exact: true })).toBeEnabled();
  expect(await page.evaluate(() => (window as unknown as { __players: { destroyed: boolean }[] }).__players[0].destroyed)).toBe(true);
  await player.getByRole("button", { name: "Close player and stop listening" }).click();
  await expect(player).toHaveCount(0);
});

test("hymnal selection includes only main English arrangements and follows filtering", async ({ page }) => {
  await page.goto("/hymns/by-hymnal");
  await page.getByRole("button", { name: "Play all: 1985 Hymn Book", exact: true }).click();
  const player = page.getByRole("complementary", { name: "Listening player" });
  await player.getByRole("button", { name: /^Queue/ }).click();
  const queueButtons = player.locator("ol button");
  const expected = buildListeningQueue(songs.filter(song => song.collection === "Hymns" && song.hymnId && hymnCatalog[song.hymnId as HymnId].numbers && "hymns-1985" in hymnCatalog[song.hymnId as HymnId].numbers));
  await expect(queueButtons).toHaveCount(expected.tracks.length);
  const labels = await queueButtons.allTextContents();
  for (const track of expected.tracks) expect(labels.some(label => label.includes(track.title) && label.includes(track.style))).toBe(true);
  await page.getByRole("searchbox", { name: /Find by/ }).fill("Onward");
  await page.getByRole("button", { name: "Play all: 1985 Hymn Book · Filtered hymns", exact: true }).click();
  await expect(player).toContainText("Onward, Christian Soldiers");
  await player.getByRole("button", { name: /^Queue/ }).click();
  const onward = expected.tracks.filter(track => track.slug === "onward-christian-soldiers");
  await expect(queueButtons).toHaveCount(onward.length);
  await page.getByRole("searchbox", { name: /Find by/ }).fill("no matching hymn xyz");
  await expect(page.getByRole("button", { name: "Play all: 1985 Hymn Book · Filtered hymns", exact: true })).toBeDisabled();
});

test("unavailable videos skip forward and the last track stops without looping", async ({ page }) => {
  await page.goto("/hymns/a-royal-army");
  await page.getByRole("button", { name: "Play all: A Royal Army", exact: true }).click();
  const player = page.getByRole("complementary", { name: "Listening player" });
  await expect(player.getByRole("button", { name: "Pause", exact: true })).toBeEnabled();
  await emit(page, "onError", 150);
  await expect(player).toContainText("2 of");
  await emit(page, "onAutoplayBlocked", 0);
  await expect(player.getByRole("status")).toContainText("Tap Play");
  await player.getByRole("button", { name: /^Queue/ }).click();
  await player.locator("ol button").last().click();
  await emit(page, "onStateChange", 0);
  await expect(player.getByRole("status")).toContainText("end of this queue");
  await expect(player.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
});

test("API failure offers retry and external playback", async ({ page }) => {
  await page.unroute("https://www.youtube.com/iframe_api");
  await page.route("https://www.youtube.com/iframe_api", route => route.abort());
  await page.goto("/hymns");
  await page.getByRole("button", { name: "Play all: All Hymns", exact: true }).click();
  const player = page.getByRole("complementary", { name: "Listening player" });
  await expect(player.getByRole("status")).toContainText("could not load");
  await expect(player.getByRole("link", { name: /Open song on YouTube/ })).toBeVisible();
  await page.unroute("https://www.youtube.com/iframe_api");
  await page.route("https://www.youtube.com/iframe_api", route => route.fulfill({ contentType: "application/javascript", body: mockAPI }));
  await player.getByRole("button", { name: "Try again" }).click();
  await expect(player.getByRole("button", { name: "Pause", exact: true })).toBeEnabled();
});

test("collection controls are present at each supported level", async ({ page }) => {
  for (const path of ["/scripture", "/scripture/old-testament", "/conference", "/conference/2026-april", "/conference/speakers", "/kids", "/international", "/originals", "/speeches-songified"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole("button", { name: /^Play all:/ }).first()).toBeVisible();
  }
  await page.goto("/scripture/old-testament");
  await page.locator("details summary").first().click();
  await expect(page.locator("details").first().getByRole("button", { name: /^Play all:/ })).toBeVisible();
  await page.goto("/international");
  await page.locator("details summary").first().click();
  await expect(page.locator("details").first().getByRole("button", { name: /^Play all:/ })).toBeVisible();
});

test("mobile player fits the viewport with a visible 200px video", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/hymns");
  await page.getByRole("button", { name: "Play all: All Hymns", exact: true }).click();
  const player = page.getByRole("complementary", { name: "Listening player" });
  await expect(player.getByRole("button", { name: "Pause", exact: true })).toBeEnabled();
  const box = await player.locator("iframe").boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(200);
  expect(box!.height).toBeGreaterThanOrEqual(200);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await expect(player.getByRole("button", { name: "Close player and stop listening" })).toBeInViewport();
});
