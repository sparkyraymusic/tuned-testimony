import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { internationalSingles } from "@/data/songs/international/singles";
import styles from "./page.module.css";
import PlayAll from "@/components/PlayAll";
import { buildListeningQueue } from "@/lib/listening";

const languageLabels: Record<string, { nativeName: string; code: string }> = {
  Portuguese: { nativeName: "Português", code: "pt" },
  Spanish: { nativeName: "Español", code: "es" },
  Tagalog: { nativeName: "Tagalog", code: "tl" },
  Japanese: { nativeName: "日本語", code: "ja" },
  German: { nativeName: "Deutsch", code: "de" },
};

const preferredLanguageOrder = Object.keys(languageLabels);
const languages = [...new Set(internationalSingles.map((song) => song.style))]
  .sort((a, b) => {
    const aIndex = preferredLanguageOrder.indexOf(a);
    const bIndex = preferredLanguageOrder.indexOf(b);
    return (aIndex < 0 ? Infinity : aIndex) -
      (bIndex < 0 ? Infinity : bIndex) || a.localeCompare(b);
  });

export default function InternationalPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="eyebrow">International Collection</p>
          <h1>International Hymns</h1>
          <PlayAll title="International Hymns" queue={buildListeningQueue(languages.flatMap(language => internationalSingles.filter(song => song.style === language).sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""))))} />
          <p>
            Beloved hymns shared across languages and cultures, celebrating
            faith and testimony through music from around the world.
          </p>
          <Link className="button button-secondary" href="/">Back to Home</Link>
        </div>
      </section>
      <section className={styles.singlesSection} aria-labelledby="languages-heading">
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Around the World</p>
          <h2 id="languages-heading">Explore by Language</h2>
          <p>Choose a language to explore its hymns, with the newest releases first.</p>
        </div>
        <div className={styles.languageList}>
          {languages.map((language) => {
            const label = languageLabels[language];
            const songs = internationalSingles
              .filter((song) => song.style === language)
              .sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""));

            return (
              <details className={styles.languageSection} name="international-language" key={language}>
                <summary className={styles.languageHeading}>
                  <span className={styles.languageNames}>
                    <span className={styles.nativeName} lang={label?.code}>
                      {label?.nativeName ?? language}
                    </span>
                    {label && label.nativeName !== language && (
                      <span className={styles.englishName}>{language}</span>
                    )}
                  </span>
                  <span className={styles.languageCount}>
                    {songs.length} {songs.length === 1 ? "song" : "songs"}
                  </span>
                  <span className={styles.languageChevron} aria-hidden="true" />
                </summary>
                <PlayAll title={`${language} Hymns`} queue={buildListeningQueue(songs)} />
                <div className={styles.singlesGrid}>
                  {songs.map((song) => (
                    <Link key={song.slug} href={`/songs/${song.slug}`} className={styles.singleCard}>
                      {song.image && (
                        <Image
                          src={song.image}
                          alt={`${song.title} cover art`}
                          width={600}
                          height={600}
                          sizes="(max-width: 600px) calc(100vw - 5rem), (max-width: 1000px) 42vw, 260px"
                          className={styles.singleImage}
                        />
                      )}
                      <div className={styles.singleContent}>
                        <h3 lang={label?.code}>{song.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
