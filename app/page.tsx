"use client";

import { useState } from "react";
import Link from "next/link";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.Response === "False") {
      setError(data.Error || "No results found");
      setMovies([]);
    } else {
      setMovies(data.Search);
    }

    setLoading(false);
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Movie Watchlist</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.imdbID}
            href={`/movie/${movie.imdbID}`}
            className="border rounded overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold text-sm">{movie.Title}</p>
              <p className="text-xs text-gray-500">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}