import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { songs } from "@/data/songs";
import styles from "./page.module.css";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue, conferenceOrder } from "@/lib/listening";

function speakerSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[.’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function lastName(name: string) {
  return name.trim().split(/\s+/).at(-1) ?? name;
}

export default function ConferenceSpeakersPage() {
  const conferenceSongs = songs.filter(
    (song) =>
      song.collection === "Conference" &&
      song.conferenceSpeaker,
  );

  const speakers = Array.from(
    new Map(
      conferenceSongs.map((song) => [
        song.conferenceSpeaker!,
        {
          name: song.conferenceSpeaker!,
          slug: speakerSlug(song.conferenceSpeaker!),
          count: 0,
        },
      ]),
    ).values(),
  );

  speakers.forEach((speaker) => {
    speaker.count = conferenceSongs.filter(
      (song) => song.conferenceSpeaker === speaker.name,
    ).length;
  });

  speakers.sort((a, b) =>
    lastName(a.name).localeCompare(lastName(b.name)),
  );

  const speakersByLetter = speakers.reduce<
    Record<string, typeof speakers>
  >((groups, speaker) => {
    const letter = lastName(speaker.name).charAt(0).toUpperCase();

    groups[letter] ??= [];
    groups[letter].push(speaker);

    return groups;
  }, {});

  const letters = Object.keys(speakersByLetter).sort();

  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">Conference Collection</p>
          <h1>Conference Songs</h1>
          <PlayAll title="All Conference Songs" queue={buildListeningQueue(songs.filter(song => song.collection === "Conference").sort(conferenceOrder))} />
          <p>
            General Conference messages transformed into music.
          </p>

          <Link className="button button-secondary" href="/">
            Back to Home
          </Link>
        </div>
      </section>

      <section className={styles.speakerSection}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Browse the Collection</p>
          <h2>Explore by Speaker</h2>
          <p>
            Choose a speaker to explore the Conference Talk Songs inspired by
            their messages.
          </p>
        </div>

        <div className={styles.browseOptions}>
          <Link href="/conference" className={styles.browseOption}>
            By Conference
          </Link>

          <span
            className={`${styles.browseOption} ${styles.browseOptionActive}`}
          >
            By Speaker
          </span>
        </div>

        <nav className={styles.alphabet} aria-label="Speaker alphabet">
          {letters.map((letter) => (
            <a key={letter} href={`#speaker-${letter.toLowerCase()}`}>
              {letter}
            </a>
          ))}
        </nav>

        <div className={styles.speakerGroups}>
          {letters.map((letter) => (
            <section
              className={styles.letterSection}
              id={`speaker-${letter.toLowerCase()}`}
              key={letter}
            >
              <h3>{letter}</h3>

              <div className={styles.speakerGrid}>
                {speakersByLetter[letter].map((speaker) => (
                  <Link
                    href={`/conference/speakers/${speaker.slug}`}
                    className={styles.speakerCard}
                    key={speaker.name}
                  >
                    <h4>{speaker.name}</h4>
                    <span>
                      {speaker.count}{" "}
                      {speaker.count === 1 ? "song" : "songs"} →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
