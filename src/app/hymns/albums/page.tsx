import Image from "next/image";
import Link from "next/link";
import { hymnAlbums } from "@/data/hymn-albums";
import styles from "../page.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HymnBrowseNav from "@/components/HymnBrowseNav";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";
import { songs } from "@/data/songs";

export default function HymnAlbumsPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Hymns Collection</p>
          <h1>Hymns</h1>
          <PlayAll title="All Hymns" queue={buildListeningQueue(songs.filter(song => song.collection === "Hymns"))} />
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
