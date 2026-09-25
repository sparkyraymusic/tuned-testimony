import type { Song, StreamingLink } from "../data/songs/types";
import { getSongVideo } from "../data/songs/get-song-video.ts";

export type QueueTrack = { slug: string; title: string; style: string; videoId: string };
export type ListeningQueue = { tracks: QueueTrack[]; total: number };

export function youtubeVideo(urlString: string): { id: string; short: boolean } | undefined {
  try {
    const url = new URL(urlString);
    if (!["https:", "http:"].includes(url.protocol)) return;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const parts = url.pathname.split("/").filter(Boolean);
    let id: string | null | undefined;
    if (host === "youtu.be") id = parts[0];
    else if (["youtube.com", "music.youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      if (parts[0] === "watch") id = url.searchParams.get("v");
      else if (["shorts", "embed", "live"].includes(parts[0])) id = parts[1];
    }
    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return { id, short: parts[0] === "shorts" };
  } catch { /* Invalid catalog links are unavailable for playback. */ }
}

export function selectedSongVideo(links: StreamingLink[]): string | undefined {
  return getSongVideo(links)?.id;
}

/** Preserve collection order and distinct arrangements, removing duplicate song entries. */
export function buildListeningQueue(songs: readonly Song[]): ListeningQueue {
  const unique = [...new Map(songs.map(song => [song.slug, song])).values()];
  return {
    total: unique.length,
    tracks: unique.flatMap(song => {
      const videoId = selectedSongVideo(song.links);
      return videoId ? [{ slug: song.slug, title: song.title, style: song.style, videoId }] : [];
    }),
  };
}

export function shuffledTracks(tracks: readonly QueueTrack[]): QueueTrack[] {
  const shuffled = [...tracks];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function conferenceOrder(a: Song, b: Song): number {
  return (b.conferenceYear ?? 0) - (a.conferenceYear ?? 0)
    || Number(b.conferenceMonth === "October") - Number(a.conferenceMonth === "October")
    || (a.conferenceSessionOrder ?? 999) - (b.conferenceSessionOrder ?? 999)
    || (a.conferenceTalkOrder ?? 999) - (b.conferenceTalkOrder ?? 999);
}
