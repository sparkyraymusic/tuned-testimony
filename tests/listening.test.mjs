import assert from "node:assert/strict";
import test from "node:test";
import { buildListeningQueue, conferenceOrder, selectedSongVideo, shuffledTracks, youtubeVideo } from "../src/lib/listening.ts";
import { goodlySongs } from "../src/data/songs/hymns/goodly.ts";

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

test("prefers a lyric video over a music recording", () => {
  assert.equal(selectedSongVideo([video("lyrics12345", "Lyric Video"), video("music123456")]), "lyrics12345");
});

test("featured Let Us Oft Speak Kind Words queues the cinematic hymn", () => {
  const queue = buildListeningQueue(goodlySongs.filter(song => song.featured));
  assert.equal(queue.tracks.find(track => track.slug === "let-us-oft-speak-kind-words-country")?.videoId, "S-yB8KGRXUo");
});

test("queues use Cinematic, Lyric Video, Lyric Short, then YouTube Music regardless of link order", () => {
  const ranked = [video("cinema12345", "Cinematic"), video("lyrics12345", "Lyric Video"),
    video("short123456", "Lyric Short"), video("music123456")];
  const ids = ["cinema12345", "lyrics12345", "short123456", "music123456"];
  const permutations = items => items.length === 0 ? [[]] : items.flatMap((item, i) =>
    permutations(items.filter((_, j) => j !== i)).map(rest => [item, ...rest]));
  for (let first = 0; first < ranked.length; first++) {
    for (const links of permutations(ranked.slice(first))) {
      assert.equal(buildListeningQueue([song("example", links)]).tracks[0].videoId, ids[first]);
    }
  }
  assert.equal(selectedSongVideo([{ name: "Cinematic", url: "invalid" }, ...ranked.slice(1)]), ids[1]);
});

test("cinematic clips take priority over a music recording", () => {
  assert.equal(selectedSongVideo([
    { name: "Cinematic", url: "https://youtube.com/shorts/short123456" },
    video("music123456"),
  ]), "short123456");
});

test("prefers cinematic videos over shorts and includes short-only songs", () => {
  assert.equal(selectedSongVideo([
    video("short123456"),
    { name: "Lyric Video", url: "https://youtube.com/shorts/short123456" },
    video("full1234567", "Cinematic"),
  ]), "full1234567");
  assert.equal(selectedSongVideo([video("short123456", "YouTube Short")]), "short123456");
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
