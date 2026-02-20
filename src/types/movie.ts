export type MoviePage = {
  page: number;
  results: Array<MoviePageResult>;
  totalPages: number;
  totalResults: number;
};

export type MoviePageResult = {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
};
