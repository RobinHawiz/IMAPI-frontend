import type { DomainError } from "@customTypes/error";
import type { ReviewCreatePayload } from "@customTypes/review";
import delay from "@utils/delay";

interface IReviewApi {
  createReview(review: ReviewCreatePayload): Promise<void>;
}

export class ReviewAPI implements IReviewApi {
  private readonly baseUrl;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
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

  private async request(url: string, options: RequestInit = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 400) {
        const error = (await response.json()) as DomainError;
        throw new Error(error.message);
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error("Only signed in users are allowed to review movies.");
      } else {
        throw new Error("Unexpected App error");
      }
    }

    return response;
  }
}
