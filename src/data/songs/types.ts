import type { HymnId } from "../hymnals";

export type StreamingLink = {
  name: string;
  url: string;
};

export type SongCollection =
  | "Hymns"
  | "Kids"
  | "International"
  | "Scripture"
  | "Conference"
  | "Originals"
  | "Speeches Songified";

export type ReleaseType = "Single" | "Album Track";

export type Song = {
  hymnId?: HymnId;
  slug: string;
  title: string;
  collection: SongCollection;
  releaseType: ReleaseType;
  releaseDate?: string;
  style: string;
	scriptureVolume?: ScriptureVolume;
	scriptureBook?: string;
	scriptureReference?: string;
  albumSlug?: string;
  albumTitle?: string;
  image?: string;
  description: string;
  hyperFollow?: string;
	conferenceYear?: number;
	conferenceMonth?: ConferenceMonth;
	conferenceSessionOrder?: number;
	conferenceSession?: string;
	conferenceTalkOrder?: number;
	conferenceSpeaker?: string;
	conferenceTalkTitle?: string;
  conferenceTalkUrl?: string;
  speechSpeaker?: string;
  speechForum?: string;
  speechTitle?: string;
  speechDate?: string;
  links: StreamingLink[];
};

export type ScriptureVolume =
| "Old Testament"
| "New Testament"
| "Book of Mormon"
| "Doctrine & Covenants"
| "Pearl of Great Price";

export type ConferenceMonth = "April" | "October";
