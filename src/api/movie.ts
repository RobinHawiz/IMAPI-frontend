import type { DomainError } from "@customTypes/error";
import type { MovieResponse, MoviePage } from "@customTypes/movie";
import delay from "@utils/delay";

interface IMovieApi {
  getMovies(searchTerm: string): Promise<MoviePage>;
}

export class MovieAPI implements IMovieApi {
  private readonly baseUrl;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async getMovies(searchTerm: string) {
    // Simulate network delay
    await delay(700);

    const response = await this.request(
      `${this.baseUrl}/movies/search?query=${searchTerm}`,
    );
    return (await response.json()) as MoviePage;
  }

  async getMovie(tmdbMovieId: string) {
    // Simulate network delay
    await delay(700);

    const response = await this.request(
      `${this.baseUrl}/movies/${tmdbMovieId}`,
    );
    return (await response.json()) as MovieResponse;
  }

  private async request(url: string, options: RequestInit = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 400) {
        const error = (await response.json()) as DomainError;
        throw new Error(error.message);
      } else {
        throw new Error("Unexpected App error");
      }
    }

    return response;
  }
}
