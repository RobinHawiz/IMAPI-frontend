import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { moviePageQueryOptions } from "@hooks/queryOptions";
import MovieCard from "@routes/public/movies/components/MovieCard";
import WriteReview from "@components/WriteReview";
import { useEffect, useState } from "react";

function MoviePage() {
  const [searchParams] = useSearchParams();
  const [selectedMovie, setSelectedMovie] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const query = searchParams.get("query") ?? "";

  const { data: moviePage, isFetching } = useQuery(
    moviePageQueryOptions(query),
  );

  // Opens the review modal after a movie is selected for rating (from a MovieCard)
  useEffect(() => {
    if (!selectedMovie) return;
    const modal = document.getElementById(
      "write-review-modal",
    ) as HTMLDialogElement | null;
    modal?.showModal();
  }, [selectedMovie]);

  return (
    <>
      <div className="xs:max-w-146 flex w-full flex-col items-center md:max-w-4xl lg:max-w-285">
        <h1 className="w-full self-start text-2xl font-black tracking-wide md:text-3xl lg:text-4xl">
          All Movies<span className="text-accent">.</span>
        </h1>
        {isFetching ? (
          <div className="flex-center mt-2 flex-col sm:mt-6 md:mt-8">
            <span className="loading loading-spinner text-accent w-10 md:w-20"></span>
            <p className="text-accent mt-5 block self-end text-sm sm:text-base">
              Loading Movies...
            </p>
          </div>
        ) : moviePage !== undefined && moviePage.results.length > 0 ? (
          <ul className="xs:grid-cols-2 mt-2 grid grid-cols-1 gap-6 sm:mt-6 md:mt-8 md:grid-cols-3 md:gap-7 lg:grid-cols-4">
            {moviePage.results.map((movie) => (
              <li key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                  posterPath={movie.posterPath}
                  setSelectedMovie={setSelectedMovie}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 self-start text-sm sm:text-base">
            Looks like we don’t have that. Try a different search.
          </p>
        )}
      </div>
      {selectedMovie !== null && (
        <WriteReview id={selectedMovie.id} title={selectedMovie.title} />
      )}
    </>
  );
}

export default MoviePage;
