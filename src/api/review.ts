import type { DomainError } from "@customTypes/error";
import type {
  CurrentUserReview,
  Review,
  ReviewCreatePayload,
  ReviewUpdatePayload,
} from "@customTypes/review";
import delay from "@utils/delay";

interface IReviewApi {
  createReview(review: ReviewCreatePayload): Promise<void>;
  getMovieReviews(tmdbMovieId: string): Promise<Array<Review>>;
  getCurrentUserReviews(): Promise<Array<CurrentUserReview>>;
}

export class ReviewAPI implements IReviewApi {
  private readonly baseUrl;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async getMovieReviews(tmdbMovieId: string) {
    // Simulate network delay
    await delay(700);

    const options: RequestInit = {
      headers: {
        // The token is needed to check if a signed in user has liked any of the reviews that we fetch
        // If user is not signed in then no review will be marked as liked by default
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await this.request(
      `${this.baseUrl}/movies/${tmdbMovieId}/reviews`,
      options,
    );

    return (await response.json()) as Array<Review>;
  }

  async getCurrentUserReviews() {
    // Simulate network delay
    await delay(700);

    const options: RequestInit = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await this.request(`${this.baseUrl}/reviews/me`, options);

    return (await response.json()) as Array<CurrentUserReview>;
  }

  async createReview(review: ReviewCreatePayload) {
    // Simulate network delay
    await delay(700);

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(review),
    };
    await this.request(`${this.baseUrl}/reviews/me`, options);
  }

  async updateReview(review: ReviewUpdatePayload) {
    // Simulate network delay
    await delay(700);

    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: review.reviewTitle,
        reviewText: review.reviewText,
        rating: review.rating,
      }),
    };
    await this.request(`${this.baseUrl}/reviews/${review.id}/me`, options);
  }

  async deleteReview(reviewId: string) {
    // Simulate network delay
    await delay(700);

    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await this.request(`${this.baseUrl}/reviews/${reviewId}/me`, options);
  }

  async likeReview(reviewId: string) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    await this.request(`${this.baseUrl}/reviews/${reviewId}/like`, options);
  }

  async dislikeReview(reviewId: string) {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await this.request(`${this.baseUrl}/reviews/${reviewId}/like`, options);
  }

  private async request(url: string, options: RequestInit = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 400) {
        const error = (await response.json()) as DomainError;
        throw new Error(error.message);
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Only signed in users are allowed to review movies and like reviews.",
        );
      } else {
        throw new Error("Unexpected App error");
      }
    }

    return response;
  }
}
