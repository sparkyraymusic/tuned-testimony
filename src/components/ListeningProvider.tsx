"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { shuffledTracks, type QueueTrack } from "@/lib/listening";
import { loadYouTube, type YouTubePlayer } from "@/lib/youtube-player";
import styles from "./Listening.module.css";

type ListeningContext = {
  start(tracks: QueueTrack[], title: string, shuffle?: boolean): void;
  stop(): void;
};
const Context = createContext<ListeningContext | null>(null);

export function useListening() {
  const context = useContext(Context);
  if (!context) throw new Error("Listening controls require ListeningProvider");
  return context;
}

export default function ListeningProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ tracks: QueueTrack[]; title: string; id: number } | null>(null);
  const nextId = useRef(0);
  const trigger = useRef<HTMLElement | null>(null);
  const stop = () => {
    setSession(null);
    if (trigger.current?.isConnected) trigger.current.focus();
  };
  return (
    <Context.Provider value={{
      start(tracks, title, shuffle = false) {
        if (!tracks.length) return;
        trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        // Stop a standalone video before beginning a collection, and vice versa.
        window.dispatchEvent(new Event("tuned-testimony:stop-video"));
        setSession({ tracks: shuffle ? shuffledTracks(tracks) : [...tracks], title, id: ++nextId.current });
      },
      stop,
    }}>
      {children}
      {session && <QueuePlayer key={session.id} tracks={session.tracks} title={session.title} onClose={stop} />}
    </Context.Provider>
  );
}

function QueuePlayer({ tracks, title, onClose }: { tracks: QueueTrack[]; title: string; onClose(): void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("Loading YouTube…");
  const [retry, setRetry] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const [height, setHeight] = useState(280);
  const panel = useRef<HTMLElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);
  const currentIndex = useRef(0);
  const track = tracks[index];

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollPaddingBottom;
    root.style.scrollPaddingBottom = `${height + 16}px`;
    return () => { root.style.scrollPaddingBottom = previous; };
  }, [height]);

  useEffect(() => {
    if (!panel.current) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.target.getBoundingClientRect().height));
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let instance: YouTubePlayer | undefined;
    let readyTimeout: ReturnType<typeof setTimeout> | undefined;
    const host = mount.current!;
    const target = document.createElement("div");
    host.replaceChildren(target);
    loadYouTube().then(api => {
      if (cancelled) return;
      readyTimeout = setTimeout(() => {
        if (!cancelled) setMessage("YouTube is taking too long to respond. Try again or open this song on YouTube.");
      }, 15000);
      instance = new api.Player(target, {
        host: "https://www.youtube-nocookie.com",
        width: "100%", height: "100%", videoId: tracks[currentIndex.current].videoId,
        playerVars: { playsinline: 1, origin: window.location.origin, rel: 0 },
        events: {
          onReady(event) {
            if (cancelled) return;
            clearTimeout(readyTimeout);
            player.current = event.target;
            event.target.getIframe().title = "Tuned Testimony YouTube player";
            setReady(true);
            setMessage("");
            event.target.playVideo();
          },
          onStateChange(event) {
            if (cancelled) return;
            setPlaying(event.data === 1);
            if (event.data === 1) setMessage("");
            if (event.data === 0) {
              const next = currentIndex.current + 1;
              if (next < tracks.length) {
                currentIndex.current = next;
                setIndex(next);
                event.target.loadVideoById(tracks[next].videoId);
              } else setMessage("You’ve reached the end of this queue.");
            }
          },
          onError(event) {
            if (cancelled) return;
            setPlaying(false);
            // A finite queue prevents endless retries when several videos are unavailable.
            const next = currentIndex.current + 1;
            if ([100, 101, 150].includes(event.data) && next < tracks.length) {
              const skipped = tracks[currentIndex.current].title;
              currentIndex.current = next;
              setIndex(next);
              setMessage(`${skipped} is unavailable here. Skipping to the next song.`);
              event.target.loadVideoById(tracks[next].videoId);
            } else setMessage("This song couldn’t play here. Try again, choose another song, or open it on YouTube.");
          },
          onAutoplayBlocked() {
            if (!cancelled) setMessage("Tap Play or use the YouTube player to begin listening.");
          },
        },
      });
    }).catch(error => { if (!cancelled) setMessage(error.message); });
    return () => {
      cancelled = true;
      clearTimeout(readyTimeout);
      player.current = null;
      instance?.destroy();
      host.replaceChildren();
    };
  }, [tracks, retry]);

  function select(next: number) {
    if (!ready || !player.current || next < 0 || next >= tracks.length) return;
    currentIndex.current = next;
    setIndex(next);
    setMessage("");
    setPlaying(false);
    player.current.loadVideoById(tracks[next].videoId);
  }

  return (
    <>
      <div aria-hidden="true" style={{ height, flexShrink: 0 }} />
      <aside className={styles.player} ref={panel} aria-label="Listening player">
        <div className={styles.playerInner}>
          <div className={styles.video} ref={mount} />
          <div className={styles.info}>
            <div className={styles.heading}>
              <span className={styles.label}>Listening on YouTube · {title}</span>
              <button type="button" onClick={onClose} aria-label="Close player and stop listening">Close ✕</button>
            </div>
            <Link className={styles.trackTitle} href={`/songs/${track.slug}`}>{track.title}</Link>
            <span className={styles.label}>{track.style} · {index + 1} of {tracks.length}</span>
            <div className={styles.buttons}>
              <button type="button" disabled={!ready || index === 0} onClick={() => select(index - 1)}>Previous</button>
              <button type="button" disabled={!ready} onClick={() => {
                setMessage("");
                if (playing) player.current?.pauseVideo();
                else player.current?.playVideo();
              }}>{playing ? "Pause" : "Play"}</button>
              <button type="button" disabled={!ready || index === tracks.length - 1} onClick={() => select(index + 1)}>Next</button>
              <button type="button" aria-expanded={showQueue} aria-controls="listening-queue" onClick={() => setShowQueue(!showQueue)}>Queue ({tracks.length})</button>
            </div>
            <div className={styles.status} role="status">{message}</div>
            <div className={styles.links}>
              <a href={`https://www.youtube.com/watch?v=${track.videoId}`} target="_blank" rel="noopener noreferrer">Open song on YouTube ↗</a>
              {message && message !== "Loading YouTube…" && <button type="button" onClick={() => {
                setReady(false); setPlaying(false); setMessage("Loading YouTube…"); setRetry(value => value + 1);
              }}>Try again</button>}
            </div>
          </div>
        </div>
        {showQueue && <ol id="listening-queue" className={styles.queue}>
          {tracks.map((item, position) => <li key={item.slug}>
            <button type="button" disabled={!ready} aria-current={position === index ? "true" : undefined} onClick={() => select(position)}>
              {position + 1}. {item.title} <span>· {item.style}</span>
            </button>
          </li>)}
        </ol>}
      </aside>
    </>
  );
}
