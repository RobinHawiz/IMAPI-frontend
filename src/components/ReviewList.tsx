import { useQuery } from "@tanstack/react-query";
import { reviewListQueryOptions } from "@hooks/queryOptions";
import close from "@images/close.svg";
import ReviewCard from "@components/ReviewCard";

type Props = {
  tmdbMovieId: string;
  movieTitle: string;
};

function ReviewList({ tmdbMovieId, movieTitle }: Props) {
  const {
    data: reviewList,
    isFetching,
    isRefetching,
  } = useQuery(reviewListQueryOptions(tmdbMovieId));

  const closeModal = () => {
    const modal = document.getElementById(
      "write-review-modal",
    ) as HTMLDialogElement | null;

    modal?.close();
  };
  return (
    <dialog id="read-reviews-modal" className="modal">
      <div className="modal-box w-full max-w-3xl px-2 shadow-none sm:px-4">
        <form method="dialog">
          <button
            className="focus-visible:border-accent border-subtle/60 xs:p-3 xs:top-13 xs:right-12 absolute top-10 right-8.5 z-10 cursor-pointer rounded-full border border-solid bg-white/5 p-2.5 transition-colors duration-200 ease-in-out hover:bg-white/10 focus-visible:outline-none"
            aria-label="Close modal"
            onClick={closeModal}
          >
            <img
              src={close}
              className="xs:h-3 xs:w-3 h-2.5 w-2.5"
              aria-hidden="true"
            />
          </button>
        </form>
        <div className="bg-modal/85 xs:p-8 border-subtle/60 flex flex-col rounded-3xl border border-solid p-4 backdrop-blur-lg">
          <div>
            <div className="border-subtle/20 mb-2 border-b border-solid pb-2 sm:mb-4 sm:pb-4">
              <h2 className="text-2xl font-black md:text-3xl">
                Reviews<span className="text-accent">.</span>
              </h2>
              <p className="text-muted text-sm sm:text-base">{movieTitle}</p>
            </div>
            {isFetching && !isRefetching ? (
              <div className="flex-center mt-2 flex-col sm:mt-6 md:mt-8">
                <span className="loading loading-spinner text-accent w-10 md:w-20"></span>
                <p className="text-accent mt-5 block text-sm sm:text-base">
                  Loading Reviews...
                </p>
              </div>
            ) : reviewList !== undefined && reviewList.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {reviewList.map((review) => (
                  <li key={review.id}>
                    <ReviewCard
                      id={review.id}
                      userId={review.userId}
                      title={review.title}
                      reviewText={review.reviewText}
                      rating={review.rating}
                      username={review.username}
                      likes={review.likes}
                      createdAt={review.createdAt}
                      likedByMe={review.likedByMe}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm sm:text-base">
                No reviews yet. Check back later or be the first to write one.
              </p>
            )}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          className="cursor-default"
          aria-label="Close modal"
          onClick={closeModal}
        >
          close
        </button>
      </form>
    </dialog>
  );
}

export default ReviewList;
