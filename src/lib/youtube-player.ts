export type YouTubePlayer = {
  loadVideoById(id: string): void;
  playVideo(): void;
  pauseVideo(): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
};
type PlayerEvent = { target: YouTubePlayer; data: number };
type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    host: string;
    width: string;
    height: string;
    videoId: string;
    playerVars: { playsinline: number; origin: string; rel: number };
    events: {
      onReady(event: PlayerEvent): void;
      onStateChange(event: PlayerEvent): void;
      onError(event: PlayerEvent): void;
      onAutoplayBlocked(): void;
    };
  }) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let loading: Promise<YouTubeAPI> | undefined;

/** Load only after a listener chooses to play; failed loads can be retried. */
export function loadYouTube(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (loading) return loading;
  loading = new Promise<YouTubeAPI>((resolve, reject) => {
    const script = document.createElement("script");
    const previous = window.onYouTubeIframeAPIReady;
    const cleanup = () => {
      clearTimeout(timeout);
      window.onYouTubeIframeAPIReady = previous;
    };
    const fail = () => {
      cleanup();
      script.remove();
      reject(new Error("YouTube could not load. Check your connection and try again."));
    };
    const timeout = window.setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = () => {
      cleanup();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("YouTube could not load. Please try again."));
      previous?.();
    };
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
  }).catch(error => {
    loading = undefined;
    throw error;
  });
  return loading;
}
