import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { originalSingles } from "@/data/songs/originals/singles";
import styles from "./page.module.css";

export default function OriginalsPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Originals Collection</p>
          <h1>Original Songs</h1>
          <p>
            Faith, family, humor, life, and everything in between—original
            songs written to tell stories, share testimony, and occasionally
            have a little fun.
          </p>

          <Link className="button button-secondary" href="/">
            Back to Home
          </Link>
        </div>
      </section>

      <section className={styles.singlesSection}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Latest Releases</p>
          <h2>Recent Originals</h2>
          <p>
            Original songs from Tuned Testimony.
          </p>
        </div>

        <div className={styles.singlesGrid}>
          {[...originalSingles]
            .sort(
              (a, b) =>
                new Date(b.releaseDate ?? 0).getTime() -
                new Date(a.releaseDate ?? 0).getTime(),
            )
            .map((song) => (
              <Link
                key={song.slug}
                href={`/songs/${song.slug}`}
                className={styles.singleCard}
              >
                {song.image && (
                  <Image
                    src={song.image}
                    alt={`${song.title} cover art`}
                    width={1600}
                    height={900}
                    sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, (max-width: 1400px) 31vw, 430px"
                    className={styles.singleImage}
                  />
                )}

                <div className={styles.singleContent}>
                  <h3>{song.title}</h3>
                  <p>{song.style}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
