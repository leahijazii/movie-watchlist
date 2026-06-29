interface MovieDetail {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Genre: string;
  Runtime: string;
}

async function getMovie(id: string): Promise<MovieDetail> {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`
  );
  return res.json();
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
          alt={movie.Title}
          className="w-full sm:w-64 rounded shadow"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-500 mb-4">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>
          <p className="mb-4">{movie.Plot}</p>
          <p>
            <span className="font-semibold">Director:</span> {movie.Director}
          </p>
          <p>
            <span className="font-semibold">Actors:</span> {movie.Actors}
          </p>
          <p className="mt-2">
            <span className="font-semibold">IMDb Rating:</span>{" "}
            {movie.imdbRating} / 10
          </p>
        </div>
      </div>
    </main>
  );
}