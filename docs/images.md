# Preparing artwork for the website

Keep your full-resolution originals in your normal artwork folder outside this
repository. The site stores smaller WebP copies. Next.js then delivers responsive
sizes of those copies for each visitor's screen.

## Adding new artwork

1. Copy a PNG or JPEG into the appropriate folder under `public`, for example
   `public/songs/hymns/my-new-song.png`.
2. Add the song's image reference as usual, for example
   `image: "/songs/hymns/my-new-song.png"`.
3. From the project terminal, run:

   ```sh
   npm run images:optimize
   ```

4. Preview with `npm run dev`, then commit the new WebP files, updated image
   references, and deleted PNG/JPEG copies together with your song changes.

The command converts PNG/JPEG files under `public` to WebP, fits artwork within
1600 × 1600 pixels without cropping or enlarging, and uses quality 82. Brand
images use lossless WebP to preserve transparency and clean lettering. It updates
literal local image URLs in `src`, then removes the repository's PNG/JPEG copies.
It does not touch your originals outside the project, existing WebP files, SVGs,
or Next.js icons under `src/app`.

**Run it after adding the image references**, so they are updated along with the
files. If you add a reference afterwards, use the new `.webp` extension. Any
custom code that constructs a PNG/JPEG path dynamically needs a corresponding
manual extension change; the existing song-art fallback paths already use WebP.

For replacement artwork, a new filename (for example `my-song-v2.png`) prevents
visitors from seeing a cached old copy. You can safely rerun the command: existing
WebP images are not recompressed. If both a PNG and JPEG share a base filename,
the command stops so they cannot overwrite the same WebP file.

This is an explicit preparation step, not a deployment or an automatic build
hook. Batch changes into a single production deployment to reduce deploy costs.
Removing originals from the current checkout does not remove historical Git
versions; no Git history rewriting is performed.

## Displaying images

Use `next/image` with a `sizes` hint that matches the layout. Keep cards lazy
loaded (the default). Large fixed width attributes alone can make a phone fetch
a desktop-sized image; `sizes` lets the browser choose an appropriate version.

YouTube thumbnails stay on YouTube's servers. If a thumbnail fails, local fallback
artwork uses Next.js optimization instead of downloading the source file directly.

Image file-size reduction is not the same as Netlify billing savings: the site
already optimizes images, and bandwidth also includes other traffic. Measure
actual page downloads and check Netlify usage after deployment.

## September 2026 measurements

133 source images changed from 349.8 MB of PNGs to 34.2 MB of WebP files.
In local browser checks with a fresh context, 2× pixel density, and each page
scrolled to load its images, downloaded image bodies totaled:

| Page | Phone (390px), before → after | Desktop (1440px), before → after |
| --- | --- | --- |
| Home | 1,506 → 477 KB | 1,576 → 811 KB |
| Kids | 596 → 274 KB | 596 → 218 KB |
| Scripture | 366 → 86 KB | 366 → 158 KB |

These compare the already-optimized previous site with the updated sizing and
WebP sources. They exclude HTML, scripts, and streaming media. Netlify's image
CDN may produce different sizes than the local Next.js optimizer.
