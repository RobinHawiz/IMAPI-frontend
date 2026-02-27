import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { queryClient } from "@src/queryClient";
import { MovieAPI } from "@api/movie";
import { ReviewAPI } from "@api/review";
import type { ReviewCreatePayload } from "@customTypes/review";

const movieApi = new MovieAPI();
const reviewApi = new ReviewAPI();

export function reviewAddMutationOptions() {
  return mutationOptions({
    mutationFn: (review: ReviewCreatePayload) => reviewApi.createReview(review),
    onSuccess: (_data, review) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.setQueryData(["reviews", review.tmdbMovieId], { ...review });
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
