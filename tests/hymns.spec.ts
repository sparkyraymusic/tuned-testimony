import { test, expect } from "@playwright/test";

test("hymns feature selected singles and browse singles alongside album tracks", async ({ page }) => {
  await page.goto("/hymns");
  const featured = page.getByRole("region", { name: "Featured Releases" });
  await expect(featured.getByRole("heading", { level: 3 })).toHaveText([
    "A Poor Wayfaring Man of Grief", "Battle Hymn of the Republic", "Joseph Smith's First Prayer",
  ]);
  const catalog = page.getByRole("region", { name: "All Hymn Songs" });
  await page.getByLabel("Search by title").fill("Joseph Smith's First Prayer");
  await expect(catalog.getByRole("heading", { level: 3 })).toHaveCount(2);
  await page.getByLabel("Musical style").selectOption("Pop/Rock");
  await expect(catalog.getByRole("heading", { level: 3 })).toHaveCount(1);
  await page.getByLabel("Search by title").fill("does not exist");
  await expect(catalog.getByText(/No songs match/)).toBeVisible();
  await page.getByLabel("Search by title").fill("");
  await page.getByLabel("Musical style").selectOption("");
  await page.getByLabel("Sort by").selectOption("az");
  const titles = await catalog.getByRole("heading", { level: 3 }).allTextContents();
  expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  await catalog.getByRole("button", { name: "Show more songs" }).click();
  await expect(catalog.getByRole("heading", { level: 3 })).toHaveCount(48);
  await page.getByRole("navigation", { name: "Browse hymns" }).getByRole("link", { name: "Albums", exact: true }).click();
  await expect(page).toHaveURL(/\/hymns\/albums$/);
  await expect(page.getByRole("heading", { name: "Albums", exact: true })).toBeVisible();
  await page.getByRole("navigation", { name: "Browse hymns" }).getByRole("link", { name: "By Hymnal" }).click();
  await expect(page).toHaveURL(/\/hymns\/by-hymnal$/);
});

test("hymn browsing controls fit a mobile screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/hymns");
  await page.getByLabel("Search by title").fill("Battle Hymn");
  await page.getByLabel("Musical style").selectOption("Cinematic Gospel Rock");
  await expect(page.getByRole("region", { name: "All Hymn Songs" }).getByRole("heading", { level: 3 })).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
