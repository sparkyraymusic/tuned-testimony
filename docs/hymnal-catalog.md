# Adding hymn recordings

The album view lives at `/hymns`; `/hymns/by-hymnal` groups recordings by the
original hymn, with the 1985 hymn book selected initially.

Each hymn recording in `src/data/songs/` has a `hymnId` pointing to
`src/data/hymnals.ts`. Use the same ID for every arrangement of a hymn,
including Kids versions and translations. The recording retains its own title,
style, album, artwork, and listening links.

For another version of an existing hymn, add the existing `hymnId` to the song.
For a new hymn, first add a catalog entry with a stable ID, its English title,
and verified numbers for each book in which it appears. Then use that ID on the
song. TypeScript checks IDs for typos. Only entries with recordings appear in
the browser; the catalog is not intended to list unrecorded hymns.

Numbers are strings: Children's Songbook page references can include suffixes,
such as `20b`. International arrangements appear under the English edition's
number, not the translated edition's number. The catalog supports membership
in multiple books (for example, Called to Serve).

Official source indexes are linked in `hymnals.ts` and in the browser. The Home
and Church catalog uses the digital release numbers; check its official index
when adding songs or when numbering changes.
