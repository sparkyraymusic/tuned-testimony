import SongVideo from "@/components/SongVideo";
import { getSongVideo } from "@/data/songs/get-song-video";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { songs } from "@/data/songs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StreamingLinks from "@/components/StreamingLinks";
import { hymnAlbums } from "@/data/hymn-albums";
import { getSongImage } from "@/data/songs/get-song-image";

type SongPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SongPage({ params }: SongPageProps) {
  const { slug } = await params;

  const song = songs.find((item) => item.slug === slug);

  if (!song) {
    notFound();
  }

  const album = hymnAlbums.find(
    (item) => item.slug === song.albumSlug
  );

  const image = getSongImage(song, album?.image);
  const video = getSongVideo(song.links);
  const isSpeech = song.collection === "Speeches Songified";
  const displayTitle = isSpeech
    ? song.title.replace(/\s*\(Speeches Songified\)\s*$/i, "")
    : song.title;

  return (
    <main className={[styles.page, song.collection === "Speeches Songified" ? styles.speeches : ""].join(" ")}>
      <SiteHeader />
			<section className={styles.hero}>
				<div className={styles.heroGrid}>
      {video ? (
        <SongVideo key={video.id} video={video} title={song.title} artwork={image} />
      ) : image && (
        <div className={styles.heroImage}>
          <Image
            src={image}
            alt={`${song.title} artwork`}
            width={1600}
            height={900}
            priority
          />
        </div>
      )}

          <div className={styles.heroContent}>
            <p className="eyebrow">{song.collection} Collection</p>

            <h1>{displayTitle}</h1>

            <p className={styles.style}>{isSpeech ? "Speeches Songified" : song.style}</p>

            <p className={styles.description}>{song.description}</p>
            {song.collection === "Speeches Songified" && (
              <dl className={styles.speechMeta}>
                <div><dt>Speaker</dt><dd>{song.speechSpeaker}</dd></div>
                <div><dt>Forum</dt><dd>{song.speechForum}</dd></div>
                <div><dt>Talk</dt><dd>{song.speechTitle}</dd></div>
                {song.speechDate && <div><dt>Talk date</dt><dd><time dateTime={song.speechDate}>{new Date(song.speechDate + "T00:00:00Z").toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric", timeZone: "UTC"})}</time></dd></div>}
                {song.releaseDate && <div><dt>Song released</dt><dd><time dateTime={song.releaseDate}>{new Date(song.releaseDate + "T00:00:00Z").toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric", timeZone: "UTC"})}</time></dd></div>}
              </dl>
            )}

          {song.hyperFollow && (
            <a
              href={song.hyperFollow}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hyperFollow}
            >
              Listen Everywhere
            </a>
          )}

          {song.albumSlug && song.albumTitle && (
            <div className={styles.meta}>
              <span>From the album</span>
              <Link href={`/hymns/${song.albumSlug}`}>
                {song.albumTitle}
              </Link>
            </div>
          )}
            <StreamingLinks
              links={song.links}
              label="Listen & Watch"
            />
						<div className={styles.actions}>
            {song.albumSlug && song.albumTitle && (
              <Link
                className="button button-secondary"
                href={`/hymns/${song.albumSlug}`}
              >
                Back to {song.albumTitle}
              </Link>
            )}
              {song.collection === "Speeches Songified" && <Link className="button button-secondary" href="/speeches-songified">Back to Speeches Songified</Link>}
              <Link className="button button-secondary" href="/">
                  Home
              </Link>
						</div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
