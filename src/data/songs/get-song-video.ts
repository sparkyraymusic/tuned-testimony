import type { StreamingLink } from "./types";

export type SongVideo = { id: string; isShort: boolean; isCinematic: boolean; isMusic: boolean };

export function getSongVideo(links: StreamingLink[]): SongVideo | undefined {
  const videos = links.flatMap((link) => {
    if (!/^(YouTube )?Lyric (Video|Shorts?)$|^YouTube Shorts?$|^Cinematic( Lyric Video)?$|^YouTube Music$/i.test(link.name.trim())) return [];
    try {
      const url = new URL(link.url);
      if (!['https:', 'http:'].includes(url.protocol)) return [];
      const host = url.hostname.toLowerCase().replace(/^www\./, "");
      const parts = url.pathname.split("/").filter(Boolean);
      let id: string | null | undefined;
      if (host === "youtu.be") id = parts[0];
      else if (["youtube.com", "music.youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
        if (parts[0] === "watch") id = url.searchParams.get("v");
        else if (["shorts", "embed"].includes(parts[0])) id = parts[1];
      }
      if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return [];
      return [{ id, isCinematic: /^Cinematic/i.test(link.name.trim()), isShort: parts[0] === "shorts" || /Shorts?$/i.test(link.name.trim()), isMusic: /^YouTube Music$/i.test(link.name.trim()) }];
    } catch { return []; }
  });
  const featured = videos.filter(video => !video.isMusic);
  return featured.find(video => video.isCinematic)
    ?? featured.find(video => !video.isShort)
    ?? featured.find(video => video.isShort)
    ?? videos.find(video => video.isMusic);
}
