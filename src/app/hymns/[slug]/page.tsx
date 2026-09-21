import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { hymnAlbums } from "@/data/hymn-albums";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StreamingLinks from "@/components/StreamingLinks";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";
import { songs } from "@/data/songs";

type HymnAlbumPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function HymnAlbumPage({
  params,
}: HymnAlbumPageProps) {
  const { slug } = await params;

  const album = hymnAlbums.find((item) => item.slug === slug);

  if (!album) {
    notFound();
  }

  return (
    <main className={styles.page}>
			<SiteHeader />
			<section className={styles.hero}>
				<div className={styles.heroGrid}>
					<div className={styles.heroArt}>
            <Image
              src={album.image}
              alt={`${album.title} album cover`}
              width={700}
              height={700}
              priority
            />
          </div>
          <div className={styles.heroContent}>
            <p className="eyebrow">Hymns Collection</p>
            <h1>{album.title}</h1>
            <PlayAll title={album.title} queue={{
              ...buildListeningQueue(album.tracks.flatMap(track => {
                const song = songs.find(song => song.slug === track.songSlug);
                return song ? [song] : [];
              })),
              total: album.tracks.length,
            }} />
            <p className={styles.subtitle}>{album.subtitle}</p>
						{album.links.length > 0 && (
							<StreamingLinks
								links={album.links}
								label="Listen to the Album"
							/>
						)}
            <div className={styles.actions}>
              <Link className="button button-secondary" href="/hymns">
                Back to Hymns
              </Link>
            </div>
          </div>
        </div>
      </section>
		{album.tracks.length > 0 && (
			<section className={styles.trackSection}>
				<div className={styles.trackSectionHeader}>
					<p className="eyebrow">Track List</p>
					<h2>{album.title}</h2>
					<p>
						{album.tracks.length} {album.tracks.length === 1 ? "song" : "songs"}
					</p>
				</div>

				<ol className={styles.trackList}>
					{album.tracks.map((track, index) => (
						<li className={styles.trackItem} key={track.title}>
							<span className={styles.trackNumber}>
								{String(index + 1).padStart(2, "0")}
							</span>

							{"songSlug" in track && track.songSlug ? (
								<Link
									className={styles.trackLink}
									href={`/songs/${track.songSlug}`}
								>
									<span className={styles.trackTitle}>{track.title}</span>
									<span className={styles.trackStyle}>{track.style}</span>
								</Link>
							) : (
								<div className={styles.trackDetails}>
									<span className={styles.trackTitle}>{track.title}</span>
									<span className={styles.trackStyle}>{track.style}</span>
								</div>
							)}
						</li>
					))}
				</ol>
			</section>
		)}
			<SiteFooter />
		</main>
  );
}
