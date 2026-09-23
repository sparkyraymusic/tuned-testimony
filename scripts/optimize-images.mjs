import { readFile, readdir, mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

async function filesWithin(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesWithin(file));
    else if (entry.isFile()) files.push(file);
  }
  return files.sort();
}

/** Originals must be backed up outside the repo before running this command. */
export async function optimizeImages(root = projectRoot) {
  const publicRoot = path.resolve(root, "public");
  const inputs = (await filesWithin(publicRoot)).filter(file => /\.(png|jpe?g)$/i.test(file));
  const converted = [];
  const destinations = new Set();
  for (const input of inputs) {
    const output = input.replace(/\.(png|jpe?g)$/i, ".webp");
    if (destinations.has(output.toLowerCase())) throw new Error(`Multiple originals would overwrite ${output}`);
    destinations.add(output.toLowerCase());
  }
  for (const input of inputs) {
    const bytes = await readFile(input);
    const metadata = await sharp(bytes).metadata();
    if ((metadata.pages ?? 1) > 1) throw new Error(`Animated image needs manual review: ${input}`);
    const relative = path.relative(publicRoot, input).split(path.sep).join("/");
    const output = input.replace(/\.(png|jpe?g)$/i, ".webp");
    const isBrand = relative.startsWith("brand/") || relative === "tuned-testimony-logo.png";
    const optimized = await sharp(bytes)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp(isBrand ? { lossless: true } : { quality: 82, effort: 5 })
      .toBuffer();
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, optimized);
    converted.push({ input, from: `/${relative}`, to: `/${relative.replace(/\.(png|jpe?g)$/i, ".webp")}`, before: bytes.length, after: optimized.length });
  }

  // Update literal local URLs, including CSS URLs. Remote YouTube thumbnails and
  // Next's app/icon.png conventions are deliberately outside this migration.
  for (const file of (await filesWithin(path.join(root, "src"))).filter(file => /\.(tsx?|jsx?|css|json|mjs)$/.test(file))) {
    const original = await readFile(file, "utf8");
    let updated = original;
    for (const image of converted) updated = updated.replaceAll(image.from, image.to);
    if (updated !== original) await writeFile(file, updated);
  }

  // Delete only the exact originals read from public, after conversion and all
  // reference writes succeeded. No recursive deletion and no symlink traversal.
  for (const image of converted) await unlink(image.input);
  return {
    count: converted.length,
    before: converted.reduce((sum, image) => sum + image.before, 0),
    after: converted.reduce((sum, image) => sum + image.after, 0),
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await optimizeImages();
  if (!result.count) console.log("No new PNG/JPEG images to prepare. Existing WebP files are left unchanged.");
  else console.log(`Prepared ${result.count} WebP images: ${(result.before / 1048576).toFixed(1)} MB → ${(result.after / 1048576).toFixed(1)} MB. Updated source references and removed repository originals. Review and commit these changes together.`);
}
