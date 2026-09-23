import type { Song, ScriptureVolume } from "./types";

const scriptureVolumeSlugs: Record<ScriptureVolume, string> = {
  "Old Testament": "old-testament",
  "New Testament": "new-testament",
  "Book of Mormon": "book-of-mormon",
  "Doctrine & Covenants": "doctrine-and-covenants",
  "Pearl of Great Price": "pearl-of-great-price",
};

export function getSongImage(song: Song, albumImage?: string) {
  if (song.image) {
    return song.image;
  }

  if (
    song.collection === "Conference" &&
    song.conferenceYear &&
    song.conferenceMonth
  ) {
    return `/songs/conference/${song.conferenceYear}/${song.conferenceMonth.toLowerCase()}/default.webp`;
  }

  if (song.collection === "Scripture" && song.scriptureVolume) {
    const volumeSlug = scriptureVolumeSlugs[song.scriptureVolume];

    return `/songs/scripture/${volumeSlug}/default.webp`;
  }

  if (albumImage) {
    return albumImage;
  }

  return "/tuned-testimony-logo.webp";
}
