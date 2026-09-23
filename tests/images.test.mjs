import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, writeFile, readFile, access, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { optimizeImages } from "../scripts/optimize-images.mjs";

test("image preparation resizes artwork, updates local references, and is safe to rerun", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "tuned-images-test-"));
  try {
    await mkdir(path.join(root, "public", "songs"), { recursive: true });
    await mkdir(path.join(root, "src"));
    const original = path.join(root, "public", "songs", "sample.png");
    await sharp({ create: { width: 2400, height: 1200, channels: 4, background: "#54cccc" } }).png().toFile(original);
    await writeFile(path.join(root, "src", "sample.ts"), 'const image = "/songs/sample.png"; const thumbnail = "https://i.ytimg.com/vi/123/hqdefault.jpg";');
    const result = await optimizeImages(root);
    assert.equal(result.count, 1);
    const metadata = await sharp(await readFile(path.join(root, "public", "songs", "sample.webp"))).metadata();
    assert.equal(metadata.width, 1600);
    assert.equal(metadata.height, 800);
    await assert.rejects(access(original));
    const source = await readFile(path.join(root, "src", "sample.ts"), "utf8");
    assert.ok(source.includes('"/songs/sample.webp"'));
    assert.ok(source.includes("https://i.ytimg.com/vi/123/hqdefault.jpg"));
    assert.equal((await optimizeImages(root)).count, 0);
  } finally {
    // The exact temporary directory created above, never a repository path.
    await rm(root, { recursive: true, force: true });
  }
});

test("conflicting source extensions fail before either original is deleted", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "tuned-images-test-"));
  try {
    await mkdir(path.join(root, "public"));
    await mkdir(path.join(root, "src"));
    await writeFile(path.join(root, "public", "same.png"), "source one");
    await writeFile(path.join(root, "public", "same.jpg"), "source two");
    await assert.rejects(optimizeImages(root), /Multiple originals/);
    await access(path.join(root, "public", "same.png"));
    await access(path.join(root, "public", "same.jpg"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
