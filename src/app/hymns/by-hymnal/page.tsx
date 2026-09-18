import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HymnBrowseNav from "@/components/HymnBrowseNav";
import HymnalBrowser, { type HymnalEntry } from "@/components/HymnalBrowser";
import { hymnCatalog, type HymnId } from "@/data/hymnals";
import { songs } from "@/data/songs";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Hymns by Hymnal | Tuned Testimony",
  description: "Find hymns by number or title in the 1985 hymn book, Children's Songbook, and Hymns for Home and Church. Explore every arrangement, including Kids and International versions.",
};

export default function HymnsByHymnalPage() {
  const entries: HymnalEntry[] = (Object.keys(hymnCatalog) as HymnId[]).map((id) => ({
    id,
    ...hymnCatalog[id],
    versions: songs.filter((song) => song.hymnId === id).map((song) => ({
      slug: song.slug, title: song.title, style: song.style,
      collection: song.collection, albumTitle: song.albumTitle,
    })),
  })).filter((entry) => entry.versions.length > 0);

  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Hymns Collection</p>
          <h1>Hymns by Hymnal</h1>
          <p>Find a familiar hymn, then explore fresh arrangements across musical styles, languages, and generations.</p>
        </div>
      </section>
      <HymnBrowseNav active="hymnal" />
      <section className={styles.albumsSection} aria-label="Browse recordings by hymnal">
        <HymnalBrowser entries={entries} />
      </section>
      <SiteFooter />
    </main>
  );
}
