import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { currentUserReviewListQueryOptions } from "@hooks/queryOptions";
import ReviewCard from "@routes/protected/your-reviews/components/ReviewCard";
import EditReview from "@routes/protected/your-reviews/components/EditReview";

function ReviewList() {
  const [selectedReview, setSelectedReview] = useState<{
    id: string;
    reviewTitle: string;
    reviewText: string;
    rating: number;
    movieTitle: string;
    tmdbMovieId: string;
  } | null>(null);
  const { data: reviewList, isFetching } = useQuery(
    currentUserReviewListQueryOptions(),
  );

  // Opens the modal for movie reviews after a movie is selected for viewing reviews (from a MovieCard)
  useEffect(() => {
    if (!selectedReview) return;
    const modal = document.getElementById(
      "edit-review-modal",
    ) as HTMLDialogElement | null;
    modal?.showModal();
  }, [selectedReview]);

  return (
    <>
      <div>
        {isFetching ? (
          <div className="flex-center mt-2 flex-col sm:mt-6 md:mt-8">
            <span className="loading loading-spinner text-accent w-10 md:w-20"></span>
            <p className="text-accent mt-5 block text-sm sm:text-base">
              Loading Reviews...
            </p>
          </div>
        ) : reviewList !== undefined && reviewList.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviewList.map((review) => (
              <li key={review.id}>
                <ReviewCard
                  id={review.id}
                  tmdbMovieTitle={review.tmdbMovieTitle}
                  title={review.title}
                  reviewText={review.reviewText}
                  rating={review.rating}
                  likes={review.likes}
                  createdAt={review.createdAt}
                  tmdbMovieId={review.tmdbMovieId}
                  setSelectedReview={setSelectedReview}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm sm:text-base">
            No reviews yet. Start sharing your thoughts on movies you've
            watched!
          </p>
        )}
      </div>
      {selectedReview !== null && <EditReview {...selectedReview} />}
    </>
  );
}

export default ReviewList;
