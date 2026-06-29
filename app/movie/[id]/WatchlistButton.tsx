"use client";

import { useState, useEffect } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  WatchlistMovie,
} from "@/lib/watchlist";

export default function WatchlistButton({ movie }: { movie: WatchlistMovie }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWatchlist(movie.imdbID));
  }, [movie.imdbID]);

  function toggleWatchlist() {
    if (saved) {
      removeFromWatchlist(movie.imdbID);
      setSaved(false);
    } else {
      addToWatchlist(movie);
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggleWatchlist}
      className={`mt-4 px-4 py-2 rounded font-semibold ${
        saved
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      {saved ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
}