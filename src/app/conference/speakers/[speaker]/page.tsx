import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { songs } from "@/data/songs";
import styles from "./page.module.css";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";

function speakerSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[.’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function SpeakerDetailPage({
  params,
}: {
  params: Promise<{ speaker: string }>;
}) {
  const { speaker } = await params;

  const speakerSongs = songs
    .filter(
      (song) =>
        song.collection === "Conference" &&
        song.conferenceSpeaker &&
        speakerSlug(song.conferenceSpeaker) === speaker,
    )
    .sort((a, b) => {
      if ((a.conferenceYear ?? 0) !== (b.conferenceYear ?? 0)) {
        return (b.conferenceYear ?? 0) - (a.conferenceYear ?? 0);
      }

      const monthOrder = {
        October: 2,
        April: 1,
      };

      return (
        (monthOrder[b.conferenceMonth as keyof typeof monthOrder] ?? 0) -
        (monthOrder[a.conferenceMonth as keyof typeof monthOrder] ?? 0)
      );
    });

  if (speakerSongs.length === 0) {
    notFound();
  }

  const speakerName = speakerSongs[0].conferenceSpeaker;

  const useDecadeGroups = speakerSongs.length >= 8;

	const songsByDecade = speakerSongs.reduce<Record<number, typeof speakerSongs>>(
		(groups, song) => {
			if (!song.conferenceYear) return groups;

			const decade = Math.floor(song.conferenceYear / 10) * 10;

			if (!groups[decade]) {
				groups[decade] = [];
			}

			groups[decade].push(song);
			return groups;
		},
		{},
	);

	const decades = Object.keys(songsByDecade)
		.map(Number)
		.sort((a, b) => b - a);

  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Conference Collection</p>
          <h1>{speakerName}</h1>
          <PlayAll title={speakerName ?? "Conference Speaker"} queue={buildListeningQueue(speakerSongs)} />
          <p>
            Conference Talk Songs inspired by messages from {speakerName}.
          </p>

          <Link
            className="button button-secondary"
            href="/conference/speakers"
          >
            Back to Speakers
          </Link>
        </div>
      </section>

      <section className={styles.songSection}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Conference Talk Songs</p>
          <h2>{speakerSongs.length} {speakerSongs.length === 1 ? "Song" : "Songs"}</h2>
        </div>

			{useDecadeGroups ? (
				<div className={styles.decadeList}>
					{decades.map((decade, index) => (
						<details
							key={decade}
							className={styles.decadeGroup}
							open={index === 0}
						>
							<summary className={styles.decadeSummary}>
								<span>{decade}s</span>
								<span className={styles.decadeCount}>
									{songsByDecade[decade].length}{" "}
									{songsByDecade[decade].length === 1 ? "song" : "songs"}
								</span>
							</summary>
							<PlayAll title={`${speakerName} · ${decade}s`} queue={buildListeningQueue(songsByDecade[decade])} />

							<div className={styles.songList}>
								{songsByDecade[decade].map((song) => (
									<Link
										key={song.slug}
										href={`/songs/${song.slug}`}
										className={styles.songCard}
									>
										<div>
											<p className={styles.conference}>
												{song.conferenceMonth} {song.conferenceYear}
												{song.conferenceSession
													? ` · ${song.conferenceSession}`
													: ""}
											</p>

											<h3>{song.title}</h3>
										</div>

										<span className={styles.arrow} aria-hidden="true">
											→
										</span>
									</Link>
								))}
							</div>
						</details>
					))}
				</div>
			) : (
				<div className={styles.songList}>
					{speakerSongs.map((song) => (
						<Link
							key={song.slug}
							href={`/songs/${song.slug}`}
							className={styles.songCard}
						>
							<div>
								<p className={styles.conference}>
									{song.conferenceMonth} {song.conferenceYear}
									{song.conferenceSession
										? ` · ${song.conferenceSession}`
										: ""}
								</p>

								<h3>{song.title}</h3>
							</div>

							<span className={styles.arrow} aria-hidden="true">
								→
							</span>
						</Link>
					))}
				</div>
			)}
      </section>

      <SiteFooter />
    </main>
  );
}
