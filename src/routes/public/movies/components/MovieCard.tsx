import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import type { MoviePageResult } from "@customTypes/movie";
import missingPoster from "@images/missing-poster.png";

type Props = MoviePageResult & {
  setSelectedMovie: Dispatch<
    SetStateAction<{
      tmdbMovieId: string;
      title: string;
    } | null>
  >;
  setSelectedMovieReview: Dispatch<
    SetStateAction<{
      tmdbMovieId: string;
      movieTitle: string;
    } | null>
  >;
};

function MovieCard({
  id,
  title,
  releaseDate,
  posterPath,
  setSelectedMovie,
  setSelectedMovieReview,
}: Props) {
  return (
    <article className="shadow-elevation-medium bg-subtle/10 border-subtle/20 hover:[:has(a.movie-link:hover)]:border-accent/30 hover:[:has(a.movie-link:hover)]:bg-accent/2 [:has(a.movie-link:focus)]:bg-accent/2 [:has(a.movie-link:focus)]:border-accent/30 xs:w-full xs:max-w-70 relative max-w-60 overflow-hidden rounded-2xl border border-solid backdrop-blur-lg transition-colors duration-200 ease-in-out">
      <Link
        className="movie-link group block pb-6"
        aria-label={`View ${title} movie page`}
        to={`/movies/${id}`}
      >
        <div className="group-focus relative aspect-2/3 w-full overflow-hidden before:absolute before:top-0 before:z-10 before:block before:h-full before:w-full before:bg-transparent before:transition-all before:duration-200 before:ease-in-out group-hover:before:bg-black/30 group-focus:before:bg-black/30">
          <img
            className="h-full w-full transition-all duration-200 ease-in-out group-hover:scale-110 group-focus:scale-110"
            src={posterPath ? posterPath : missingPoster}
            alt={`${title} poster`}
          />
        </div>
        <div className="p-5">
          <p className="text-muted mb-1 h-4.25 text-sm">
            {releaseDate.split("-")[0]}
          </p>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="line-clamp-1 text-lg font-bold">{title}</h4>
          </div>
        </div>
      </Link>
      <button
        className="text-accent focus-visible:ring-accent focus-visible:ring-offset-primary rounded-2 absolute bottom-5 left-5 z-10 cursor-pointer text-sm font-semibold transition-all duration-200 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label={`Read reviews for ${title}`}
        onClick={() => {
          setSelectedMovieReview({ tmdbMovieId: id, movieTitle: title });
        }}
      >
        Read reviews
      </button>
      <button
        className="text-accent hover:bg-accent hover:text-primary border-accent focus-visible:ring-accent focus-visible:ring-offset-primary absolute right-5 bottom-5 translate-y-1.25 cursor-pointer rounded-full border border-solid px-4 py-1 text-sm font-semibold transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label={`Rate ${title}`}
        onClick={() => {
          setSelectedMovie({ tmdbMovieId: id, title });
        }}
      >
        Rate
      </button>
    </article>
  );
}

export default MovieCard;
