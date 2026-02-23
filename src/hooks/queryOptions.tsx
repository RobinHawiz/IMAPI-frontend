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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
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
