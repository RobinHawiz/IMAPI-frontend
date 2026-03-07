import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { movieQueryOptions } from "@hooks/queryOptions";
import useDocumentTitle from "@hooks/useDocumentTitle";
import calendar from "@images/calendar.svg";
import clock from "@images/clock.svg";
import filmSmall from "@images/film-small.svg";
import star from "@images/star.svg";
import halfStar from "@images/half-star.svg";
import missingPoster from "@images/missing-poster.png";

export function ErrorBoundary() {
  useDocumentTitle("IMAPI | Movie Details");

  return (
    <h2 className="text-center text-red-500">
      Oops, something went wrong while loading the movie. Please try again in a
      moment.
    </h2>
  );
}

export function Component() {
  const { id: tmdbMovieId } = useParams<{ id: string }>();
  const { data: movie, isFetching } = useQuery(movieQueryOptions(tmdbMovieId!));
  useDocumentTitle(`IMAPI | ${movie?.title || "Movie Details"}`);

  return (
    <section
      id="movie-details"
      className="flex-center min-h-svh bg-cover bg-center px-4 md:px-10"
      style={{
        backgroundImage: movie?.backdropPath
          ? `linear-gradient(to right, rgba(18, 20, 25, 1) 0%, rgba(18, 20, 25, 0.95) 30%, rgba(18, 20, 25, 0.4) 100%), url('${movie.backdropPath}')`
          : undefined,
      }}
    >
      {isFetching ? (
        <div className="flex-center mt-2 flex-col sm:mt-6 md:mt-8">
          <span className="loading loading-spinner text-accent w-10 md:w-20"></span>
          <p className="text-accent mt-5 block text-sm sm:text-base">
            Loading Movie...
          </p>
        </div>
      ) : (
        movie && (
          <div className="flex-center mt-50 mb-30 flex-1 flex-wrap gap-10 md:mt-0 md:mb-0 md:flex-nowrap md:gap-8 lg:gap-16">
            <img
              src={movie.posterPath ? movie.posterPath : missingPoster}
              alt={movie.title}
              className="shadow-elevation-medium xs:max-h-127.5 xs:w-full xs:max-w-85 aspect-340/510 max-h-80 rounded-2xl"
            />
            <div className="flex w-full min-w-0 flex-col gap-5 md:min-w-107.5">
              <h1 className="text-secondary text-4xl font-black md:text-5xl md:leading-14 lg:text-6xl lg:leading-17">
                {movie.title}
                <span className="text-accent">.</span>
              </h1>
              <div className="xs:flex-nowrap flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="text-secondary flex-center gap-2 text-sm">
                  <img src={calendar} aria-hidden="true" className="h-3.5" />
                  <p>{movie.releaseDate}</p>
                </div>
                <span className="bg-muted xs:block hidden min-h-1 min-w-1 rounded-full"></span>
                <div className="text-secondary flex-center gap-2 text-sm">
                  <img src={clock} aria-hidden="true" className="h-3.5" />
                  <p>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </p>
                </div>
                <span className="bg-muted xs:block hidden min-h-1 min-w-1 rounded-full"></span>
                <div className="text-secondary flex-center gap-2 text-sm">
                  <img src={filmSmall} aria-hidden="true" className="h-3.5" />
                  <p className="mb-px">{movie.genres.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-5">
                {movie.averageRating ? (
                  <div className="bg-modal/40 shadow-elevation-low hover:border-accent/30 hover:bg-accent/2 flex items-center gap-3 rounded-xl border border-solid border-white/5 px-4 py-3 backdrop-blur-lg transition-colors duration-200 ease-in-out">
                    <img src={star} aria-hidden="true" className="h-6" />
                    <div>
                      <p className="text-muted text-sm">
                        <span className="text-secondary text-xl font-bold sm:text-2xl">
                          {movie.averageRating.toFixed(1)}
                        </span>{" "}
                        /10
                      </p>
                      <p className="text-muted text-xs">IMAPI Rating</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-modal/40 shadow-elevation-low hover:border-accent/30 hover:bg-accent/2 flex min-h-18.5 items-center gap-3 rounded-xl border border-solid border-white/5 px-4 py-3 backdrop-blur-lg transition-colors duration-200 ease-in-out">
                    <img src={halfStar} aria-hidden="true" className="h-6" />
                    <p className="text-xl font-bold sm:text-2xl">
                      No ratings yet
                    </p>
                  </div>
                )}
                <span className="h-10 w-px rounded-full bg-white/8"></span>
                <div className="bg-modal/40 shadow-elevation-low hover:border-accent/30 hover:bg-accent/2 inline-flex flex-col rounded-xl border border-solid border-white/5 px-4 py-3 backdrop-blur-lg transition-colors duration-200 ease-in-out">
                  <p className="text-xl font-bold sm:text-2xl">
                    {movie.reviewCount}
                  </p>
                  <p className="text-muted text-xs">User Reviews</p>
                </div>
              </div>
              <p className="text-secondary max-w-167.5 text-sm sm:text-base">
                {movie.overview}
              </p>
            </div>
          </div>
        )
      )}
    </section>
  );
}
