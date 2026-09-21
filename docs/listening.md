# Collection listening

Play All and Shuffle build a temporary YouTube queue from the current collection.
The root `ListeningProvider` keeps the player mounted during Next.js navigation.
Refreshing or closing the page clears the queue. This does not save a playlist to
the listener's YouTube account; Spotify and Apple Music integrations are not yet
implemented.

## Catalog rules

- Hymnal queues follow the current hymnal, search, and letter filters, in hymn
  number order. They include every arrangement whose collection is `Hymns`.
  Kids and International recordings remain browsable but play from their own
  collection queues.
- Album queues follow the album's track list. Conference queues use newest
  conference first, then session and talk order. Nested groups use their displayed
  order.
- `src/lib/listening.ts` prefers individual YouTube Music recordings, then other
  individual YouTube videos. Album-only links and known Shorts are excluded.
  Add a full recording's watch URL to a song's `links` to make it eligible.
- Counts describe recordings with usable individual URLs, not a guarantee of
  availability in every region. The player handles unavailable and unembeddable
  recordings at playback time. Distinct song arrangements remain distinct;
  repeated entries with the same song slug are deduplicated.

## Playback

The IFrame API is loaded only after a listener presses a playback button. The
visible YouTube player provides native volume, seeking, and fullscreen controls.
The site provides previous/next, pause/play, queue selection, and close controls.
Browser autoplay restrictions may require an extra press of Play. A failed API
load offers retry and a direct YouTube link. Known unavailable-video errors skip
to the next item; the queue stops at the end rather than looping.

Collection playback and existing standalone song videos stop one another to
avoid overlapping audio. The player is intended for listening while browsing
the site; background and lock-screen playback depend on YouTube and the browser.

## Validation

Use Node 22.18+ or Node 24 for the native TypeScript support used by unit tests.

```sh
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:browser
```

Alternatively set `PLAYWRIGHT_CHANNEL=msedge` to test with installed Microsoft
Edge. Browser tests start the site on port 3100 and mock the YouTube API for
deterministic queue, navigation, error, filtering, and mobile checks. A separate
live playback check is needed to verify the external service; API mocks do not
verify media availability or ads.

References: [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)
and [player requirements](https://developers.google.com/youtube/terms/required-minimum-functionality).
