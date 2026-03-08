import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { queryClient } from "@src/queryClient";
import { MovieAPI } from "@api/movie";
import { ReviewAPI } from "@api/review";
import type {
  CurrentUserReview,
  ReviewCreatePayload,
  ReviewUpdatePayload,
} from "@customTypes/review";

const movieApi = new MovieAPI();
const reviewApi = new ReviewAPI();

export function reviewAddMutationOptions() {
  return mutationOptions({
    mutationFn: (review: ReviewCreatePayload) => reviewApi.createReview(review),
    onSuccess: (_data, review) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["movie", String(review.tmdbMovieId)],
      });
      queryClient.invalidateQueries({ queryKey: ["currentUserReviews"] });
    },
  });
}

export function reviewEditMutationOptions(tmdbMovieId: string) {
  return mutationOptions({
    mutationFn: (review: ReviewUpdatePayload) => reviewApi.updateReview(review),
    onSuccess: (_data, review) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["movie", tmdbMovieId] });
      queryClient.setQueryData<Array<CurrentUserReview>>(
        ["currentUserReviews"],
        (oldData) => {
          if (!oldData) return [];
          return oldData.map((r) => {
            if (r.id === review.id) {
              return {
                ...r,
                title: review.reviewTitle,
                reviewText: review.reviewText,
                rating: review.rating,
              };
            } else return r;
          });
        },
      );
    },
  });
}

export function reviewDeleteMutationOptions(tmdbMovieId: string) {
  return mutationOptions({
    mutationFn: (reviewId: string) => reviewApi.deleteReview(reviewId),
    onSuccess: (_data, reviewId) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["movie", tmdbMovieId] });
      queryClient.setQueryData<Array<CurrentUserReview>>(
        ["currentUserReviews"],
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((r) => r.id !== reviewId);
        },
      );
    },
  });
}

export function reviewLikeMutationOptions() {
  return mutationOptions({
    mutationFn: (reviewId: string) => reviewApi.likeReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserReviews"] });
    },
  });
}

export function reviewDislikeMutationOptions() {
  return mutationOptions({
    mutationFn: (reviewId: string) => reviewApi.dislikeReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserReviews"] });
    },
  });
}

export function movieQueryOptions(tmdbMovieId: string) {
  return queryOptions({
    queryKey: ["movie", tmdbMovieId],
    queryFn: ({ queryKey }) => movieApi.getMovie(queryKey[1]),
    throwOnError: true,
  });
}

export function moviePageQueryOptions(searchTerm: string) {
  return queryOptions({
    queryKey: ["movies", searchTerm],
    queryFn: ({ queryKey }) => movieApi.getMovies(queryKey[1]),
    throwOnError: true,
  });
}

export function reviewListQueryOptions(tmdbMovieId: string) {
  return queryOptions({
    queryKey: ["reviews", tmdbMovieId],
    queryFn: () => reviewApi.getMovieReviews(tmdbMovieId),
    throwOnError: true,
  });
}

export function currentUserReviewListQueryOptions() {
  return queryOptions({
    queryKey: ["currentUserReviews"],
    queryFn: () => reviewApi.getCurrentUserReviews(),
    throwOnError: true,
  });
}
