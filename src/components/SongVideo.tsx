"use client";

import Image from "next/image";
import { useState } from "react";
import { useListening } from "./ListeningProvider";
import type { SongVideo as Video } from "@/data/songs/get-song-video";
import styles from "./SongVideo.module.css";

export default function SongVideo({ video, title, artwork, slug, style }: { video: Video; title: string; artwork: string; slug: string; style: string }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const { start } = useListening();
  const label = video.isShort ? "YouTube Short" : video.isMusic ? "YouTube Music" : video.isCinematic ? "cinematic video" : "lyric video";
  return (
    <div className={[styles.media, video.isShort ? styles.short : ""].join(" ")}>
      <div className={styles.frame}>
        <button className={styles.preview} onClick={() => start([{ slug, title, style, videoId: video.id }], title)} aria-label={"Play " + label + " for " + title}>
          <Image
            src={thumbnailFailed ? artwork : "https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg"}
            alt=""
            fill
            unoptimized={!thumbnailFailed}
            sizes={video.isShort ? "(max-width: 380px) calc(100vw - 40px), 340px" : "(max-width: 800px) calc(100vw - 40px), (max-width: 1264px) calc(50vw - 64px), 560px"}
            onError={() => setThumbnailFailed(true)}
            className={styles.thumbnail}
          />
          <span className={styles.play} aria-hidden="true">&#9654;</span>
          <span className={styles.caption}>Play {label}</span>
        </button>
      </div>
      <a className={styles.external} href={"https://www.youtube.com/watch?v=" + video.id} target="_blank" rel="noopener noreferrer">Watch on YouTube &rarr;</a>
    </div>
  );
}
