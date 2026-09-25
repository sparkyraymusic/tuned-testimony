"use client";

import type { ListeningQueue } from "@/lib/listening";
import { useListening } from "./ListeningProvider";
import styles from "./Listening.module.css";

export default function PlayAll({ queue, title }: { queue: ListeningQueue; title: string }) {
  const { start } = useListening();
  const count = queue.tracks.length;
  return (
    <div className={styles.playAll} role="group" aria-label={`Listen to ${title}`}>
      <div className={styles.buttons}>
        <button type="button" disabled={!count} onClick={() => start(queue.tracks, title)} aria-label={`Play all: ${title}`}>
          <span aria-hidden="true">▶</span> Play All
        </button>
        <button type="button" disabled={count < 2} onClick={() => start(queue.tracks, title, true)} aria-label={`Shuffle: ${title}`}>Shuffle</button>
      </div>
      <span className={styles.availability}>
        {count ? `${count} of ${queue.total} songs available on YouTube` : queue.total ? "No YouTube links available for this selection" : "No songs in this selection"}
        {count < queue.total && count > 0 && " · Other songs are not included"}
      </span>
    </div>
  );
}
