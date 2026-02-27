import { useQuery } from "@tanstack/react-query";
import { currentUserReviewListQueryOptions } from "@hooks/queryOptions";
import ReviewCard from "@routes/protected/your-reviews/components/ReviewCard";

function ReviewList() {
  const { data: reviewList, isFetching } = useQuery(
    currentUserReviewListQueryOptions(),
  );

  return (
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
                userId={review.userId}
                tmdbMovieTitle={review.tmdbMovieTitle}
                title={review.title}
                reviewText={review.reviewText}
                rating={review.rating}
                username={review.username}
                likes={review.likes}
                createdAt={review.createdAt}
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
  );
}

export default ReviewList;
