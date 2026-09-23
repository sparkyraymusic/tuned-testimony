import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";
import path from "node:path";
import { songs } from "../src/data/songs";
import { hymnAlbums } from "../src/data/hymn-albums";
import { getSongImage } from "../src/data/songs/get-song-image";

test("every song and album resolves to existing artwork after conversion", () => {
  for (const song of songs) {
    const album = hymnAlbums.find(album => album.slug === song.albumSlug);
    const image = getSongImage(song, album?.image);
    expect(existsSync(path.join(process.cwd(), "public", image)), `${song.slug}: ${image}`).toBe(true);
  }
  for (const album of hymnAlbums) expect(existsSync(path.join(process.cwd(), "public", album.image)), album.slug).toBe(true);
});

test("failed YouTube thumbnails fall back to optimized local artwork", async ({ page }) => {
  await page.route("https://i.ytimg.com/**", route => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/songs/a-poor-wayfaring-man-of-grief-country-ballad");
  const image = page.getByRole("button", { name: /Play cinematic video/ }).locator("img");
  await expect(image).toHaveAttribute("src", /\/_next\/image\?.*\.webp/);
  await expect(image).toHaveAttribute("sizes", /max-width: 800px/);
  await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
});

test("phone collection thumbnails load WebP with responsive sizing", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/kids");
  const image = page.getByAltText(/cover art/).first();
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute("sizes", /280px/);
  await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(await image.evaluate(node => (node as HTMLImageElement).currentSrc)).toContain(".webp");
});
