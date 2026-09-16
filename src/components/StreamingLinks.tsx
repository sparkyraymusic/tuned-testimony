import {
  FaAmazon,
  FaApple,
  FaBookBible,
  FaBookOpen,
  FaMicrophone,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa6";
import { SiTidal, SiYoutubemusic } from "react-icons/si";

import styles from "./StreamingLinks.module.css";

type StreamingLink = {
  name: string;
  url: string;
};

type StreamingLinksProps = {
  links: StreamingLink[];
  label: string;
};

const icons = {
  YouTube: FaYoutube,
  "Lyric Video": FaYoutube,
  "Cinematic Video": FaYoutube,
  "YouTube Lyric Video": FaYoutube,
  "YouTube Short": FaYoutube,
  Spotify: FaSpotify,
  "Apple Music": FaApple,
  "YouTube Music": SiYoutubemusic,
  "Amazon Music": FaAmazon,
  "Hymn": FaBookOpen,
  Tidal: SiTidal,
  Talk: FaMicrophone,
  Scripture: FaBookBible,
};

export default function StreamingLinks({
  links,
  label,
}: StreamingLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className={styles.listen}>
      <p className={styles.label}>{label}</p>

      <div className={styles.links}>
        {links.map((link) => {
          const Icon = icons[link.name as keyof typeof icons];

          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {Icon && <Icon aria-hidden="true" />}
              <span>{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
