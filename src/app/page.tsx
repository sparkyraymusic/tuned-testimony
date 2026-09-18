import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube,
  FaSpotify,
  FaApple,
  FaAmazon,
} from "react-icons/fa";
import { SiYoutubemusic, SiTidal } from "react-icons/si"
import styles from "./page.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const featuredMusic = [
  {
    title: "Joseph Smith's First Prayer",
    subtitle: "Pop/Rock Version",
    collection: "Hymns",
    image: "/songs/hymns/joseph-smiths-first-prayer-pop-rock.png",
    className: "hymns",
    href: "/songs/joseph-smiths-first-prayer-pop-rock",
  },
  {
    title: "Isaiah 53:3-5",
    subtitle: "With His Stripes We Are Healed",
    collection: "Scripture",
    image: "/songs/scripture/old-testament/isaiah-53-3-5-with-his-stripes-we-are-healed-tn.png",
    className: "scripture",
    href: "/songs/isaiah-53-3-5-with-his-stripes-we-are-healed",
  },
  {
    title: "Jeffrey R. Holland: Lord, I Believe",
    subtitle: "Conference Talk Song — Apr 2013",
    collection: "Conference",
    image: "/songs/conference/2013/april/jeffrey-r-holland-lord-i-believe.png",
    className: "conference",
    href: "/songs/jeffrey-r-holland-lord-i-believe",
  },
  {
    title: "The Mormon Mafia",
    subtitle: "Original Song",
    collection: "Originals",
    image: "/songs/originals/mormon-mafia.png",
    className: "originals",
    href: "/songs/the-mormon-mafia",
  },
];

const platforms = [
  { name: "YouTube", url: "https://www.youtube.com/@TunedTestimony", icon: FaYoutube, },
  { name: "Spotify", url: "https://open.spotify.com/artist/3tR9srCtThH37vZO1C8GEF", icon: FaSpotify, },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/tuned-testimony/6772563383", icon: FaApple, },
  { name: "YouTube Music", url: "https://music.youtube.com/@TunedTestimony", icon: SiYoutubemusic, },
  { name: "Amazon Music", url: "https://music.amazon.com/artists/B0H2SK8KCY/tuned-testimony?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_nWgqlPTOqjXn1dupen3Nr0fHZ", icon: FaAmazon, },
  { name: "Tidal", url: "https://tidal.com/artist/80089012/u", icon: SiTidal, },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Image
            className={styles.heroLogo}
            src="/brand/wordmark.png"
            alt="Tuned Testimony"
            width={1200}
            height={474}
            priority
          />
          <p className={styles.tagline}>Cherished Words. Fresh Take.</p>

          <h1 className={styles.accessibleTitle}>Tuned Testimony</h1>

          <p className={styles.heroDescription}>
            Reimagined hymns, scripture songs, conference messages turned to song,
            speeches songified, and original music created to strengthen faith in Jesus Christ.
          </p>

          <div className={styles.heroActions}>
            <a className="button button-primary" href="#music">
              Explore the Music
            </a>
          </div>
          <section className={styles.featuredSection} id="featured">
            <div className={styles.sectionHeading}>
              <p className="eyebrow">Featured Music</p>
              <h2>A Taste of Tuned Testimony</h2>
              <p>
                Four songs. Four collections. Four very different ways music can carry
                testimony.
              </p>
            </div>

            <div className={styles.featuredGrid}>
          {featuredMusic.map((song) => {
            const content = (
              <>
                <div className={styles.featuredImageWrap}>
                  <Image
                    src={song.image}
                    alt={song.title}
                    width={1600}
                    height={900}
                    className={styles.featuredImage}
                  />
                </div>

                <div className={styles.featuredCardContent}>
                  <p className={styles.featuredCollection}>{song.collection}</p>
                  <h3>{song.title}</h3>
                  <p className={styles.featuredSubtitle}>{song.subtitle}</p>
                </div>
              </>
            );

            return song.href ? (
              <Link
                href={song.href}
                className={`${styles.featuredCard} ${styles[song.className]}`}
                key={song.title}
              >
                {content}
              </Link>
            ) : (
              <article
                className={`${styles.featuredCard} ${styles[song.className]}`}
                key={song.title}
              >
                {content}
              </article>
            );
          })}
            </div>
          </section>
          <section className={styles.listenSection} id="listen">
            <div className={styles.sectionHeading}>
              <p className="eyebrow">Listen Everywhere</p>
              <h2>Take Tuned Testimony With You</h2>
              <p>
                Find Tuned Testimony on your favorite music and video platforms.
              </p>
            </div>
            <div className={styles.platformGrid}>
            {platforms.map((platform) => {
              const Icon = platform.icon;

              return (
                <a
                  className={styles.platformLink}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={platform.name}
                >
                  <Icon className={styles.platformIcon} aria-hidden="true" />
                  <span>{platform.name}</span>
                </a>
              );
            })}
            </div>
          </section>
          <section className={styles.musicSection} id="music">
            <div className={styles.sectionHeading}>
              <p className="eyebrow">Explore the Music</p>
              <h2>Find Your Collection</h2>
              <p>
                Hymns, scripture, conference messages, speeches, original songs, and music for
                children—each with its own sound and purpose.
              </p>
            </div>

            <div className={styles.collectionGrid}>
              <Link href="/hymns" className={`${styles.collectionCard} ${styles.collectionCardImage} ${styles.hymns}`}>
                <div className={styles.collectionImageWrap}>
                  <Image
                    src="/collections/hymns.png"
                    alt="Hymns"
                    width={1600}
                    height={900}
                    className={styles.collectionImage}
                  />
                </div>
                <div className={styles.collectionCardContent}>
                  <h3>Hymns</h3>
                  <p>Timeless hymns reimagined in fresh musical styles. Rediscover familiar messages of worship, comfort, and faith through a new sound.</p>
                  <span className={styles.collectionExplore}>Explore Hymns →</span>
                </div>
              </Link>
              <Link
                href="/scripture"
                className={`${styles.collectionCard} ${styles.collectionCardImage} ${styles.scripture}`}
              >
                <div className={styles.collectionImageWrap}>
                  <Image
                    src="/collections/scriptures.png"
                    alt="Scripture Songs"
                    width={1600}
                    height={900}
                    className={styles.collectionImage}
                  />
                </div>
                <div className={styles.collectionCardContent}>
                  <h3>Scripture Songs</h3>
                  <p>Scripture passages brought to life through music. Learn, remember, and reflect on the words that strengthen faith in Jesus Christ.</p>
                  <span className={styles.collectionExplore}>
                    Explore Scripture Songs →
                  </span>
                </div>
              </Link>
              <Link href="/conference" className={`${styles.collectionCard} ${styles.collectionCardImage} ${styles.conference}`}>
                <div className={styles.collectionImageWrap}>
                  <Image
                    src="/collections/conference.png"
                    alt="Conference Talk Songs"
                    width={1600}
                    height={900}
                    className={styles.collectionImage}
                  />
                </div>
                <div className={styles.collectionCardContent}>
                  <h3>Conference Talk Songs</h3>
                  <p>General Conference messages transformed into music. Revisit teachings of faith, hope, and discipleship through songs inspired by the talks.</p>
                  <span className={styles.collectionExplore}>
                    Explore Conference Talk Songs →
                  </span>
                </div>
              </Link>
              <Link href="/speeches-songified" className={[styles.collectionCard, styles.collectionCardImage, styles.speeches].join(" ")}>
                <div className={styles.collectionImageWrap}>
                  <Image src="/collections/speeches-songified-text-free.png" alt="Speeches Songified" width={1672} height={941} sizes="(max-width: 700px) 100vw, 55vw" className={styles.collectionImage} />
                </div>
                <div className={styles.collectionCardContent}>
                  <h3>Speeches Songified</h3>
                  <p>Inspiring speeches transformed into music. Carry messages of faith, grace, and hope into everyday life through songs inspired by thoughtful voices.</p>
                  <span className={styles.collectionExplore}>Explore Speeches Songified &rarr;</span>
                </div>
              </Link>
              <Link href="/originals" className={`${styles.collectionCard} ${styles.collectionCardImage} ${styles.originals}`}>
                <div className={styles.collectionImageWrap}>
                  <Image
                    src="/collections/originals.png"
                    alt="Original Songs"
                    width={1600}
                    height={900}
                    className={styles.collectionImage}
                  />
                </div>
                <div className={styles.collectionCardContent}>
                  <h3>Original Songs</h3>
                  <p>Original songs exploring faith, family, hope, and everyday life. Find encouragement and connection in music inspired by the moments that shape us.</p>
                  <span className={styles.collectionExplore}>
                    Explore Original Songs →
                  </span>
                </div>
              </Link>
              <Link href="/international" className={`${styles.collectionCard} ${styles.collectionCardImage} ${styles.international}`}>
                <div className={styles.collectionImageWrap}>
                  <Image
                    src="/collections/international.png"
                    alt="International Hymns"
                    width={1600}
                    height={900}
                    className={styles.collectionImage}
                  />
                </div>
                <div className={styles.collectionCardContent}>
                  <h3>International Hymns</h3>
                  <p>Beloved hymns shared in languages from around the world. Experience familiar messages of faith through the words and sounds of different cultures.</p>
                  <span className={styles.collectionExplore}>
                    Explore International Hymns →
                  </span>
                </div>
              </Link>
              <Link href="/kids" className={`${styles.collectionCard} ${styles.collectionCardImage} ${styles.childrens}`}>
                <div className={styles.collectionImageWrap}>
                  <Image
                    src="/collections/childrens.png"
                    alt="Children's Hymns"
                    width={1600}
                    height={900}
                    className={styles.collectionImage}
                  />
                </div>
                <div className={styles.collectionCardContent}>
                  <h3>Children&apos;s Hymns</h3>
                  <p>Joyful songs of faith created especially for children and families. Sing, learn, and build lasting memories with music that brings gospel truths close to home.</p>
                  <span className={styles.collectionExplore}>
                    Explore Children&apos;s Hymns →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
