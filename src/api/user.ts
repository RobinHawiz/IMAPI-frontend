import type { DomainError } from "@customTypes/error";
import type { LoginCredentials, UserInfo } from "@customTypes/user";
import delay from "@utils/delay";

interface IUserApi {
  loginUser(cred: LoginCredentials): Promise<string>;
  getUser(): Promise<UserInfo>;
}

export class UserAPI implements IUserApi {
  private readonly baseUrl;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async loginUser(cred: LoginCredentials) {
    // Simulate network delay
    await delay(700);

    const response = await this.request(`${this.baseUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cred),
    });

    return (await response.text()) as string;
  }

  async getUser() {
    const response = await this.request(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return (await response.json()) as UserInfo;
  }

  private async request(url: string, options: RequestInit = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 400) {
        const error = (await response.json()) as DomainError;
        throw new Error(error.message);
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error("Invalid JWT");
      } else {
        throw new Error("Unexpected App error");
      }
    }

    return response;
  }
}
