import { queryOptions } from "@tanstack/react-query";
import { MovieAPI } from "@api/movie";

const movieApi = new MovieAPI();

export function moviePageQueryOptions(searchTerm: string) {
  return queryOptions({
    queryKey: ["movies", searchTerm],
    queryFn: ({ queryKey }) => movieApi.getMovies(queryKey[1]),
    throwOnError: true,
  });
}
