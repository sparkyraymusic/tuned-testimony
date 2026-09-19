import Image from "next/image";
import Link from "next/link";
import { hymnAlbums } from "@/data/hymn-albums";
import styles from "./page.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { hymnSingles } from "@/data/songs/hymns/singles";
import HymnBrowseNav from "@/components/HymnBrowseNav";

export default function HymnsPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Hymns Collection</p>
          <h1>Hymns</h1>
          <p>
            Timeless hymns reimagined in new musical styles while preserving
            the faith, testimony, and message at their heart.
          </p>

          <Link className="button button-secondary" href="/">
            Back to Home
          </Link>
        </div>
      </section>
      <HymnBrowseNav active="albums" />
      <section className={styles.singlesSection}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Latest Releases</p>
          <h2>Recent Singles</h2>
          <p>
            The latest hymn arrangements released by Tuned Testimony.
          </p>
        </div>
        <div className={styles.singlesGrid}>
          {[...hymnSingles]
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
                <div className={styles.singleArt}>
                <Image
                  src={song.image}
                  alt={`${song.title} cover art`}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, (max-width: 1400px) 31vw, 430px"
                  className={styles.singleImage}
                />
                </div>
              )}

              <div className={styles.singleContent}>
                <h3>{song.title}</h3>
                <p>{song.style}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.albumsSection}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">The Collection</p>
          <h2>Albums</h2>
          <p>
            Explore hymn collections reimagined across a variety of musical styles.
          </p>
        </div>

        <div className={styles.albumGrid}>
          {hymnAlbums.map((album) => (
            <Link
              href={`/hymns/${album.slug}`}
              className={styles.albumCard}
              key={album.slug}
            >
              <div className={styles.albumArt}>
                <Image
                  src={album.image}
                  alt={`${album.title} album cover`}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 320px"
                />
              </div>

              <div className={styles.albumInfo}>
                <h3>{album.title}</h3>
                <p>{album.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
