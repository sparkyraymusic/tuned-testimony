"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Song } from "@/data/songs/types";
import PlayAll from "./PlayAll";
import { buildListeningQueue } from "@/lib/listening";
import styles from "@/app/hymns/page.module.css";

function releaseTime(song: Song) {
  const [year, month, day] = (song.releaseDate ?? "").split("-").map(Number);
  return year && month && day ? Date.UTC(year, month - 1, day) : 0;
}

function newest(a: Song, b: Song) {
  return releaseTime(b) - releaseTime(a) || a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug);
}

function SongCards({ songs }: { songs: Song[] }) {
  return <div className={styles.singlesGrid}>
    {songs.map(song => <Link key={song.slug} href={`/songs/${song.slug}`} className={styles.singleCard}>
      {song.image && <div className={styles.singleArt}>
        <Image src={song.image} alt={`${song.title} cover art`} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 430px" className={styles.singleImage} />
      </div>}
      <div className={styles.singleContent}>
        <h3>{song.title}</h3>
        <p>{song.style}</p>
        <p>{song.releaseType === "Album Track" ? song.albumTitle ?? "Album track" : "Single"}</p>
      </div>
    </Link>)}
  </div>;
}

export default function HymnSongBrowser({ songs }: { songs: Song[] }) {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("");
  const [sort, setSort] = useState("newest");
  const [limit, setLimit] = useState(24);
  const featured = songs.filter(song => song.featured).sort(newest);
  const stylesAvailable = [...new Set(songs.map(song => song.style))].sort((a, b) => a.localeCompare(b));
  const search = query.trim().toLocaleLowerCase().replace(/[’‘]/g, "'");
  const filtered = songs.filter(song =>
    (!style || song.style === style) && song.title.toLocaleLowerCase().replace(/[’‘]/g, "'").includes(search)
  ).sort(sort === "az" ? (a, b) => a.title.localeCompare(b.title) || a.style.localeCompare(b.style) : newest);

  return <>
    {featured.length > 0 && <section className={styles.singlesSection} aria-labelledby="featured-releases">
      <div className={styles.sectionHeading}>
        <p className="eyebrow">In the Spotlight</p>
        <h2 id="featured-releases">Featured Releases</h2>
        <p>Discover these featured hymn arrangements.</p>
        <PlayAll title="Featured Hymn Releases" queue={buildListeningQueue(featured)} />
      </div>
      <SongCards songs={featured} />
    </section>}
    <section className={styles.singlesSection} aria-labelledby="all-hymn-songs">
      <div className={styles.sectionHeading}>
        <p className="eyebrow">The Collection</p>
        <h2 id="all-hymn-songs">All Hymn Songs</h2>
        <p>Explore singles and album tracks, with a new arrangement for every mood.</p>
      </div>
      <div className={styles.songControls}>
        <label>Search by title<input type="search" value={query} placeholder="Find a hymn" onChange={event => { setQuery(event.target.value); setLimit(24); }} /></label>
        <label>Musical style<select value={style} onChange={event => { setStyle(event.target.value); setLimit(24); }}>
          <option value="">All styles</option>
          {stylesAvailable.map(value => <option key={value} value={value}>{value}</option>)}
        </select></label>
        <label>Sort by<select value={sort} onChange={event => { setSort(event.target.value); setLimit(24); }}>
          <option value="newest">Newest first</option><option value="az">Title A–Z</option>
        </select></label>
      </div>
      <p role="status">{filtered.length} {filtered.length === 1 ? "song" : "songs"}{filtered.length > limit ? ` · Showing ${limit}` : ""}</p>
      <PlayAll title="Hymn Songs" queue={buildListeningQueue(filtered)} />
      {filtered.length ? <SongCards songs={filtered.slice(0, limit)} /> : <p>No songs match your search. Try another title or choose All styles.</p>}
      {filtered.length > limit && <button className={`button button-secondary ${styles.showMore}`} onClick={() => setLimit(limit + 24)}>Show more songs</button>}
    </section>
  </>;
}
