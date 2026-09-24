import Link from "next/link";
import { hymnAlbums } from "@/data/hymn-albums";
import styles from "./page.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HymnSongBrowser from "@/components/HymnSongBrowser";
import { getSongImage } from "@/data/songs/get-song-image";
import HymnBrowseNav from "@/components/HymnBrowseNav";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";
import { songs } from "@/data/songs";

export default function HymnsPage() {
  const hymnSongs = songs.filter(song => song.collection === "Hymns").map(song => ({
    ...song,
    image: getSongImage(song, hymnAlbums.find(album => album.slug === song.albumSlug)?.image),
  }));
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
      <HymnBrowseNav active="songs" />
      <HymnSongBrowser songs={hymnSongs} />
      <SiteFooter />
    </main>
  );
}
