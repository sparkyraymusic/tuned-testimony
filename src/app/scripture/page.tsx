import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { songs } from "@/data/songs";
import { scriptureCollections } from "@/data/scripture-collections";
import styles from "./page.module.css";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";

export default function ScripturePage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Scripture Collection</p>
          <h1>Scripture Songs</h1>
          <PlayAll title="All Scripture Songs" queue={buildListeningQueue(songs.filter(song => song.collection === "Scripture"))} />
          <p>
            Explore scripture set to music, organized by the standard works.
          </p>

          <Link className="button button-secondary" href="/">
            Back to Home
          </Link>
        </div>
      </section>

      <section className={styles.collectionsSection}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Explore the Scriptures</p>
          <h2>Standard Works</h2>
          <p>
            Choose a collection to explore songs organized by book of scripture.
          </p>
        </div>
        <div className={styles.collections}>
        {scriptureCollections.map((collection) => {
          const count = songs.filter((song) =>
            song.collection === "Scripture" && song.scriptureVolume === collection.title,
          ).length;
          return (
            <Link
            key={collection.slug}
            href={`/scripture/${collection.slug}`}
            className={styles.card}
            >
            <div className={styles.imageWrapper}>
                <Image
                src={collection.image}
                alt={`${collection.title} Scripture Collection`}
                width={320}
                height={320}
                className={styles.image}
                />
            </div>
            <div className={styles.cardContent}>
                <h3>{collection.title}</h3>
                <p>{collection.subtitle}</p>
                <span className={styles.explore}>{count} {count === 1 ? "song" : "songs"} &rarr;</span>
            </div>
            </Link>
          );
        })}
        </div>

      </section>

      <SiteFooter />
    </main>
  );
}
