"use client";

import { useState } from "react";
import Link from "next/link";
import { hymnals, type HymnalId } from "@/data/hymnals";
import styles from "./HymnalBrowser.module.css";
import PlayAll from "./PlayAll";
import type { QueueTrack } from "@/lib/listening";

export type HymnalEntry = {
  id: string;
  title: string;
  numbers: Partial<Record<HymnalId, string>>;
  versions: { slug: string; title: string; style: string; collection: string; albumTitle?: string; playback?: QueueTrack }[];
};

export default function HymnalBrowser({ entries }: { entries: HymnalEntry[] }) {
  const [book, setBook] = useState<HymnalId>("hymns-1985");
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("");
  const hymnal = hymnals.find((item) => item.id === book)!;
  const available = entries.filter((entry) => entry.numbers[book]).sort((a, b) =>
    a.numbers[book]!.localeCompare(b.numbers[book]!, "en", { numeric: true }));
  const search = query.trim().toLocaleLowerCase();
  const visible = available.filter((entry) =>
    (!letter || entry.title.toUpperCase().startsWith(letter)) &&
    (!search || entry.numbers[book]!.toLowerCase().startsWith(search.replace(/^#/, "")) ||
      entry.title.toLocaleLowerCase().includes(search) ||
      entry.versions.some((version) => version.title.toLocaleLowerCase().includes(search))));
  const englishVersions = visible.flatMap(entry => entry.versions.filter(version => version.collection === "Hymns"));

  return (
    <div className={styles.browser}>
      <div className={styles.bookChoices} aria-label="Choose a hymnal">
        {hymnals.map((item) => (
          <button key={item.id} type="button" aria-pressed={book === item.id} onClick={() => {
            setBook(item.id); setQuery(""); setLetter("");
          }}>
            <span>{item.title}</span>
            <span className={styles.pill}>{entries.filter((entry) => entry.numbers[item.id]).length} hymns</span>
          </button>
        ))}
      </div>

      <h2>{hymnal.title}</h2>
      <p className={styles.note}>Browse available recordings, including Kids and International versions. Numbers follow the English edition{book === "childrens-songbook" ? " and refer to pages" : ""}.</p>
      <div className={styles.controls}>
        <label htmlFor="hymn-search">Find by {book === "childrens-songbook" ? "page" : "hymn number"} or title</label>
        <input id="hymn-search" type="search" value={query} placeholder={book === "hymns-1985" ? "Try 3 or Now Let Us Rejoice" : "Enter a number or title"} onChange={(event) => { setQuery(event.target.value); setLetter(""); }} />
        <p id="letter-label">Or choose the first letter of a title</p>
        <div className={styles.alphabet} role="group" aria-labelledby="letter-label">
          <button type="button" aria-pressed={!letter} onClick={() => { setLetter(""); setQuery(""); }}>All</button>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((initial) => (
            <button type="button" key={initial} aria-pressed={letter === initial}
              disabled={!available.some((entry) => entry.title.toUpperCase().startsWith(initial))}
              onClick={() => { setLetter(initial); setQuery(""); }}>{initial}</button>
          ))}
        </div>
      </div>
      <p className={styles.note} role="status">{visible.length} {visible.length === 1 ? "hymn" : "hymns"} &middot; {visible.reduce((count, entry) => count + entry.versions.length, 0)} versions</p>
      <PlayAll title={`${hymnal.title}${search || letter ? " · Filtered hymns" : ""}`} queue={{
        tracks: englishVersions.flatMap(version => version.playback ? [version.playback] : []),
        total: englishVersions.length,
      }} />
      <p className={styles.note}>Play All follows the current selection and includes main English arrangements. Listen to Kids and International versions in their own collections.</p>
      <div className={styles.list} key={book}>
        {visible.map((entry) => (
          <details key={entry.id} className={styles.hymn}>
            <summary>
              <span className={styles.number}><span className={styles.numberLabel}>{hymnal.numberLabel}</span>{entry.numbers[book]}</span>
              <span className={styles.title}>{entry.title}</span>
              <span className={styles.pill}>{entry.versions.length} {entry.versions.length === 1 ? "version" : "versions"}</span>
              <span className={styles.chevron} aria-hidden="true">+</span>
            </summary>
            <PlayAll title={entry.title} queue={{
              tracks: entry.versions.flatMap(version => version.playback ? [version.playback] : []),
              total: entry.versions.filter(version => version.collection === "Hymns").length,
            }} />
            <ul className={styles.versions}>
              {entry.versions.map((version) => (
                <li key={version.slug}>
                  <Link href={`/songs/${version.slug}`}>
                    <span><strong>{version.style}</strong><span className={styles.versionTitle}>{version.title}</span><span className={styles.note}>{version.albumTitle ?? "Single"}</span></span>
                    <span className={styles.pill}>{version.collection === "Kids" ? "Kids" : version.collection === "International" ? "International" : "Hymns"}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      {visible.length === 0 && <div className={styles.empty}><p>No recordings match this selection yet.</p><button type="button" onClick={() => { setQuery(""); setLetter(""); }}>Show all hymns in this book</button></div>}
      <p className={styles.note}><a href={hymnal.source} target="_blank" rel="noreferrer">View the official hymnal index &rarr;</a></p>
    </div>
  );
}
