export interface WatchlistMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const KEY = "watchlist";

export function getWatchlist(): WatchlistMovie[] {
  if (typeof window === "undefined") return []; // safety check, explained below
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function addToWatchlist(movie: WatchlistMovie) {
  const list = getWatchlist();
  if (list.some((m) => m.imdbID === movie.imdbID)) return; // avoid duplicates
  const updated = [...list, movie];
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function removeFromWatchlist(imdbID: string) {
  const list = getWatchlist();
  const updated = list.filter((m) => m.imdbID !== imdbID);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function isInWatchlist(imdbID: string): boolean {
  return getWatchlist().some((m) => m.imdbID === imdbID);
}