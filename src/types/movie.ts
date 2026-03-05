export type MoviePage = {
  page: number;
  results: Array<MoviePageResult>;
  totalPages: number;
  totalResults: number;
};

export type MoviePageResult = {
  id: string;
  title: string;
  releaseDate: string;
  posterPath: string;
};

export type MovieResponse = {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  runtime: number; // minutes
  genres: Array<string>;
  posterPath: string | null;
  backdropPath: string | null;
  averageRating: number | null;
  reviewCount: number;
};
