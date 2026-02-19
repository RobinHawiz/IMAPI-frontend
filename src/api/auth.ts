interface IAuthApi {
  validateToken(token: string): Promise<void>;
}

export class AuthAPI implements IAuthApi {
  private readonly baseUrl;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async validateToken(token: string) {
    await this.request(`${this.baseUrl}/auth`, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  private async request(url: string, options: RequestInit = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Internal server error");
      } else {
        throw new Error("JWT not valid");
      }
    }

    return response;
  }
}
