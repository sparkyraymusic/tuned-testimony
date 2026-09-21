import assert from "node:assert/strict";
import test from "node:test";
import { buildListeningQueue, conferenceOrder, fullSongVideo, shuffledTracks, youtubeVideo } from "../src/lib/listening.ts";

const song = (slug, links, extra = {}) => ({ slug, title: slug, style: "Pop", links, ...extra });
const video = (id, name = "YouTube Music") => ({ name, url: `https://music.youtube.com/watch?v=${id}&si=tracking` });

test("recognizes individual YouTube recordings, including Music links", () => {
  for (const url of [
    "https://music.youtube.com/watch?v=abcdefghijk&list=album",
    "https://youtu.be/abcdefghijk?si=tracking",
    "https://www.youtube.com/embed/abcdefghijk",
    "https://m.youtube.com/watch?v=abcdefghijk",
  ]) assert.equal(youtubeVideo(url)?.id, "abcdefghijk");
});

test("does not treat album playlists, malformed IDs, or lookalike hosts as recordings", () => {
  for (const url of [
    "https://music.youtube.com/playlist?list=OLAK5album",
    "https://youtube.com.evil.example/watch?v=abcdefghijk",
    "https://youtube.com/watch?v=short",
    "ftp://youtube.com/watch?v=abcdefghijk",
    "not a url",
  ]) assert.equal(youtubeVideo(url), undefined);
});

test("prefers a full music recording over a lyric video", () => {
  assert.equal(fullSongVideo([video("lyrics12345", "Lyric Video"), video("music123456")]), "music123456");
});

test("excludes short clips even when the same clip is also labeled YouTube Music", () => {
  assert.equal(fullSongVideo([
    video("short123456"),
    { name: "Lyric Video", url: "https://youtube.com/shorts/short123456" },
    video("full1234567", "Cinematic"),
  ]), "full1234567");
  assert.equal(fullSongVideo([video("short123456", "YouTube Short")]), undefined);
});

test("counts unavailable songs, deduplicates entries, and preserves arrangement order", () => {
  const first = song("first-arrangement", [video("abcdefghijk")]);
  const second = song("second-arrangement", [video("lmnopqrstuv")]);
  const unavailable = song("album-only", [{ name: "YouTube Music", url: "https://music.youtube.com/playlist?list=album" }]);
  const queue = buildListeningQueue([first, unavailable, second, first]);
  assert.equal(queue.total, 3);
  assert.deepEqual(queue.tracks.map(track => track.slug), [first.slug, second.slug]);
  assert.deepEqual(buildListeningQueue([]), { tracks: [], total: 0 });
});

test("shuffle retains every distinct arrangement without changing the original queue", () => {
  const tracks = buildListeningQueue([song("one", [video("abcdefghijk")]), song("two", [video("lmnopqrstuv")])]).tracks;
  const original = structuredClone(tracks);
  for (let i = 0; i < 20; i++) {
    const shuffled = shuffledTracks(tracks);
    assert.notEqual(shuffled, tracks);
    assert.deepEqual([...shuffled].sort((a, b) => a.slug.localeCompare(b.slug)), [...tracks].sort((a, b) => a.slug.localeCompare(b.slug)));
  }
  assert.deepEqual(tracks, original);
});

test("conference queues use newest conference first, then session and talk order", () => {
  const talk = (slug, year, month, session, order) => song(slug, [], { conferenceYear: year, conferenceMonth: month, conferenceSessionOrder: session, conferenceTalkOrder: order });
  const songs = [talk("older", 2025, "October", 1, 1), talk("session-two", 2026, "April", 2, 1), talk("second", 2026, "April", 1, 2), talk("first", 2026, "April", 1, 1), talk("october", 2026, "October", 1, 1)];
  assert.deepEqual(songs.sort(conferenceOrder).map(song => song.slug), ["october", "first", "second", "session-two", "older"]);
});
