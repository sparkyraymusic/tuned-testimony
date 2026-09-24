import assert from "node:assert/strict";
import test from "node:test";
import { getSongVideo } from "../src/data/songs/get-song-video.ts";

const music = { name: "YouTube Music", url: "https://music.youtube.com/watch?v=abcdefghijk&si=tracking" };

test("embedded player falls back to a YouTube Music recording", () => {
  assert.deepEqual(getSongVideo([music]), {
    id: "abcdefghijk", isShort: false, isCinematic: false, isMusic: true,
  });
});

test("lyric, short, and cinematic videos take priority over Music regardless of link order", () => {
  for (const name of ["Lyric Video", "YouTube Lyric Video", "Lyric Short", "YouTube Short", "Cinematic", "Cinematic Lyric Video"]) {
    const featured = { name, url: "https://youtu.be/lmnopqrstuv" };
    for (const links of [[music, featured], [featured, music]]) {
      const selected = getSongVideo(links);
      assert.equal(selected.id, "lmnopqrstuv");
      assert.equal(selected.isMusic, false);
      assert.equal(selected.isShort, name.includes("Short"));
    }
  }
});

test("priority is Cinematic, Lyric Video, Lyric Short, then Music in every link order", () => {
  const ranked = [
    { name: "Cinematic", url: "https://youtu.be/cinema12345" },
    { name: "Lyric Video", url: "https://youtu.be/lyrics12345" },
    { name: "Lyric Short", url: "https://youtube.com/shorts/short123456" },
    music,
  ];
  const ids = ["cinema12345", "lyrics12345", "short123456", "abcdefghijk"];
  const permutations = items => items.length === 0 ? [[]] : items.flatMap((item, i) =>
    permutations(items.filter((_, j) => j !== i)).map(rest => [item, ...rest]));
  for (let first = 0; first < ranked.length; first++) {
    for (const links of permutations(ranked.slice(first))) {
      assert.equal(getSongVideo(links).id, ids[first]);
    }
  }
  assert.equal(getSongVideo([
    { ...ranked[0], url: "invalid" }, ...ranked.slice(1),
  ]).id, ids[1]);
});

test("invalid featured links allow Music fallback, but invalid Music links do not embed", () => {
  assert.equal(getSongVideo([{ name: "Lyric Video", url: "invalid" }, music]).id, "abcdefghijk");
  for (const url of [
    "https://music.youtube.com/playlist?list=album",
    "https://music.youtube.com.evil.example/watch?v=abcdefghijk",
    "https://music.youtube.com/watch?v=short",
    "ftp://music.youtube.com/watch?v=abcdefghijk",
  ]) assert.equal(getSongVideo([{ name: "YouTube Music", url }]), undefined);
});
