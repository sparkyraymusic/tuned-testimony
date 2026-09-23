import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { kidsSingles } from "@/data/songs/kids/singles";
import styles from "./page.module.css";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";

export default function KidsPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Children&apos;s Hymn Collection</p>
          <h1>Children&apos;s Hymns</h1>
          <PlayAll title="Kids Hymns" queue={buildListeningQueue([...kidsSingles].sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "")))} />
          <p>
            Bright, joyful arrangements made for children and families to sing,
            learn, and enjoy together.
          </p>
          <Link className="button button-secondary" href="/">
            Back to Home
          </Link>
        </div>
      </section>

      <section className={styles.singlesSection}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Latest Releases</p>
          <h2>Recent Singles</h2>
          <p>
            Kid-friendly hymn arrangements from Tuned Testimony.
          </p>
        </div>

        <div className={styles.singlesGrid}>
          {[...kidsSingles]
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
                    width={600}
                    height={600}
                    sizes="(max-width: 600px) calc(100vw - 40px), 280px"
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
