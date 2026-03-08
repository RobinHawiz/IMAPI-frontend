import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewDeleteMutationOptions } from "@hooks/queryOptions";
import type { CurrentUserReview } from "@customTypes/review";
import star from "@images/star.svg";

type Props = Omit<CurrentUserReview, "userId" | "username"> & {
  setSelectedReview: Dispatch<
    SetStateAction<{
      id: string;
      reviewTitle: string;
      reviewText: string;
      rating: number;
      movieTitle: string;
      tmdbMovieId: string;
    } | null>
  >;
};

function ReviewCard({
  id,
  tmdbMovieId,
  tmdbMovieTitle,
  title,
  reviewText,
  rating,
  createdAt,
  likes,
  setSelectedReview,
}: Props) {
  const { mutateAsync: deleteReviewMutation, isPending: isLoading } =
    useMutation(reviewDeleteMutationOptions(tmdbMovieId));

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the review titled "${title}"?`,
    );
    if (confirmed) {
      // Form submission
      try {
        await deleteReviewMutation(id);
      } catch (err) {
        console.log(err instanceof Error ? err.message : `${err}`);
      }
    }
  };
  return (
    <article
      className={`shadow-elevation-medium bg-subtle/10 border-subtle/20 hover:border-accent/20 min-h-52 rounded-2xl border border-solid p-6 transition-all duration-300 ease-in-out hover:-translate-y-1.5 ${isLoading ? "flex-center pointer-events-none" : "flex flex-col justify-between"}`}
    >
      {isLoading ? (
        <div className="flex-center flex-col">
          <span className="loading loading-spinner text-accent w-10 md:w-20"></span>
          <p className="text-accent mt-5 block text-sm sm:text-base">
            Deleting review...
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div>
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="xs:text-lg truncate text-base font-bold">
                {tmdbMovieTitle}
              </h3>
              <div className="flex-center bg-accent/10 min-h-7 min-w-12 gap-1 rounded-sm">
                <img src={star} className="h-3.5 w-3.5" aria-hidden="true" />
                <p className="text-accent xs:text-base text-sm leading-[1.2] font-semibold">
                  {rating}
                </p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-secondary xs:text-base line-clamp-3 text-sm leading-[1.6]">
                {reviewText}
              </p>
            </div>
          </div>
          <div className="border-subtle/20 flex justify-between border-t border-solid pt-3">
            <div className="flex gap-3">
              <div className="text-muted flex-center gap-1.5">
                <svg
                  width="11"
                  height="13"
                  viewBox="0 0 11 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.73214 0.609375C3.73214 0.27168 3.46942 0 3.14286 0C2.81629 0 2.55357 0.27168 2.55357 0.609375V1.625H1.57143C0.704688 1.625 0 2.35371 0 3.25V3.65625V4.875V11.375C0 12.2713 0.704688 13 1.57143 13H9.42857C10.2953 13 11 12.2713 11 11.375V4.875V3.65625V3.25C11 2.35371 10.2953 1.625 9.42857 1.625H8.44643V0.609375C8.44643 0.27168 8.18371 0 7.85714 0C7.53058 0 7.26786 0.27168 7.26786 0.609375V1.625H3.73214V0.609375V0.609375M1.17857 4.875H9.82143V11.375C9.82143 11.5984 9.64464 11.7813 9.42857 11.7813H1.57143C1.35536 11.7813 1.17857 11.5984 1.17857 11.375V4.875V4.875"
                    className="fill-current"
                  />
                </svg>
                <p className="text-sm">{createdAt.split(" ")[0]}</p>
              </div>
              <div className="flex-center text-muted gap-1">
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 18 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.67344 9.07907L8.02617 15.0099C8.28984 15.256 8.63789 15.3931 9 15.3931C9.36211 15.3931 9.71016 15.256 9.97383 15.0099L16.3266 9.07907C17.3953 8.08415 18 6.68845 18 5.22946V5.02555C18 2.56813 16.2246 0.47282 13.8023 0.0685232C12.1992 -0.198664 10.568 0.325164 9.42188 1.47126L9 1.89313L8.57812 1.47126C7.43203 0.325164 5.80078 -0.198664 4.19766 0.0685232C1.77539 0.47282 0 2.56813 0 5.02555V5.22946C0 6.68845 0.604687 8.08415 1.67344 9.07907V9.07907"
                    className="fill-current"
                  />
                </svg>
                <p className="text-sm">{likes}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-center text-muted group hover:text-accent focus-visible:ring-accent h-8 w-8 cursor-pointer rounded-lg bg-white/5 transition-all duration-200 ease-in-out outline-none hover:scale-105 hover:bg-white/10 focus-visible:ring-2"
                onClick={() =>
                  setSelectedReview({
                    id,
                    reviewTitle: title,
                    reviewText,
                    rating,
                    movieTitle: tmdbMovieTitle,
                    tmdbMovieId,
                  })
                }
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-current transition-transform duration-200 ease-in-out group-hover:scale-105"
                >
                  <path
                    d="M8.50062 0.439453L7.36624 1.57383L10.4131 4.6207L11.5475 3.48633C12.1334 2.90039 12.1334 1.95117 11.5475 1.36523L10.6241 0.439453C10.0381 -0.146484 9.0889 -0.146484 8.50296 0.439453H8.50062M6.83656 2.10352L1.37328 7.56914C1.12953 7.81289 0.9514 8.11523 0.852963 8.4457L0.0232751 11.2652C-0.0353187 11.4645 0.0185876 11.6777 0.1639 11.823C0.309213 11.9684 0.522494 12.0223 0.719369 11.966L3.5389 11.1363C3.86937 11.0379 4.17171 10.8598 4.41546 10.616L9.88343 5.15039L6.83656 2.10352V2.10352"
                    className="fill-current"
                  />
                </svg>
              </button>
              <button
                className="flex-center text-muted group focus-visible:ring-accent h-8 w-8 cursor-pointer rounded-lg bg-white/5 transition-all duration-200 ease-in-out outline-none hover:scale-105 hover:bg-white/10 hover:text-red-400 focus-visible:ring-2"
                onClick={handleDelete}
              >
                <svg
                  width="11"
                  height="12"
                  viewBox="0 0 11 12"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-current transition-transform duration-200 ease-in-out group-hover:scale-105"
                >
                  <path
                    d="M3.16875 0.414844L3 0.75H0.75C0.335156 0.75 0 1.08516 0 1.5C0 1.91484 0.335156 2.25 0.75 2.25H9.75C10.1648 2.25 10.5 1.91484 10.5 1.5C10.5 1.08516 10.1648 0.75 9.75 0.75H7.5L7.33125 0.414844C7.20469 0.159375 6.94453 0 6.66094 0H3.83906C3.55547 0 3.29531 0.159375 3.16875 0.414844ZM9.75 3H0.75L1.24688 10.9453C1.28438 11.5383 1.77656 12 2.36953 12H8.13047C8.72344 12 9.21562 11.5383 9.25313 10.9453L9.75 3Z"
                    className="fill-current"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default ReviewCard;
