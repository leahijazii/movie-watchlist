"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getWatchlist, removeFromWatchlist, WatchlistMovie } from "@/lib/watchlist";

export default function WatchlistPage() {
  const [movies, setMovies] = useState<WatchlistMovie[]>([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  function handleRemove(imdbID: string) {
    removeFromWatchlist(imdbID);
    setMovies(getWatchlist());
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      {movies.length === 0 && <p>No movies saved yet.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border rounded overflow-hidden">
            <Link href={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="p-2">
              <p className="font-semibold text-sm">{movie.Title}</p>
              <p className="text-xs text-gray-500">{movie.Year}</p>
              <button
                onClick={() => handleRemove(movie.imdbID)}
                className="mt-2 text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}