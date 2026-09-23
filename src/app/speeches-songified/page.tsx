import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { songs } from "@/data/songs";
import styles from "./page.module.css";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";

export const metadata: Metadata = {
  title: "Speeches Songified | Tuned Testimony",
  description: "Inspiring speeches transformed into music. Explore songs by speaker and discover the messages behind them.",
};

export default function SpeechesSongifiedPage() {
  const speechSongs = songs.filter(song => song.collection === "Speeches Songified")
    .sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""));
  const speakers = [...new Set(speechSongs.map(song => song.speechSpeaker ?? "Other speakers"))]
    .sort((a, b) => a.localeCompare(b));

  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Good words. Lasting melodies.</p>
          <h1>Speeches Songified</h1>
          <PlayAll title="Speeches Songified" queue={buildListeningQueue(speechSongs)} />
          <p>Inspiring speeches transformed into music, carrying messages of faith, grace, and hope into everyday life.</p>
          <Link href="/#music" className="button button-secondary">Back to Collections</Link>
        </div>
        <Image src="/collections/speeches-songified-text-free.webp" alt="Speeches Songified collection artwork" width={1672} height={941} sizes="(max-width: 850px) 100vw, 55vw" className={styles.banner} priority />
      </section>
      <section className={styles.catalog} aria-labelledby="speeches-heading">
        <div className={styles.heading}>
          <div><p className="eyebrow">Explore the messages</p><h2 id="speeches-heading">Songs by Speaker</h2></div>
          <span className={styles.pill}>{speechSongs.length} {speechSongs.length === 1 ? "song" : "songs"}</span>
        </div>
        {speakers.map(speaker => {
          const speakerSongs = speechSongs.filter(song => (song.speechSpeaker ?? "Other speakers") === speaker);
          return (
            <details key={speaker} className={styles.speaker} name="speech-speaker" open={speakers.length === 1}>
              <summary><span>{speaker}</span><span className={styles.pill}>{speakerSongs.length} {speakerSongs.length === 1 ? "song" : "songs"}</span></summary>
              <PlayAll title={speaker} queue={buildListeningQueue(speakerSongs)} />
              <div className={styles.grid}>
                {speakerSongs.map(song => (
                  <Link key={song.slug} href={"/songs/" + song.slug} className={styles.card}>
                    {song.image && <Image src={song.image} alt={song.title + " artwork"} width={1254} height={1254} sizes="(max-width: 600px) 90vw, 320px" />}
                    <div className={styles.cardContent}>
                      <p className={styles.forum}>{song.speechForum}</p>
                      <h3>{song.speechTitle ?? song.title}</h3>
                      {song.speechDate && <p>Talk: <time dateTime={song.speechDate}>{new Date(song.speechDate + "T00:00:00Z").toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric", timeZone: "UTC"})}</time></p>}
                      <span className={styles.pill}>Listen &amp; explore &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </details>
          );
        })}
      </section>
      <SiteFooter />
    </main>
  );
}
