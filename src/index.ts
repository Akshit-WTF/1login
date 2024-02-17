import axios from "axios";

interface OneLoginOptions {
  clientId: string;
  clientSecret: string;
  baseURL?: string;
}

interface GetUserResponse {
  id?: string;
  joinedAt?: string;
  email?: {
    address?: string;
    verified?: boolean;
  };
  phone?: {
    number?: string;
    verified?: boolean;
  };
  kyc_verified?: boolean;
  personalDetails?: {
    name?: string;
    dateOfBirth?: string;
    gender?: "MALE" | "FEMALE" | "OTHER" | "RATHER_NOT_SAY";
  };
  companyDetails?: {
    name?: string;
    website?: string;
  };
  billingDetails?: {
    firstName?: string;
    lastName?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

class OneLoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OneLoginError";
  }
}

export class OneLogin {
  private clientId: string;
  private clientSecret: string;
  private baseURL = "https://1login.xyz/api/gateway";

  constructor(options: OneLoginOptions) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    if (options.baseURL) {
      this.baseURL = options.baseURL;
    }
  }

  /**
   * Get access token from an ephemeral token.
   * @param {string} user_id - The user's ID to get an ephemeral token for.
   * @returns {Promise<string>}
   * @throws {OneLoginError}
   * @example
   * const access_token = await oneLogin.getAccessToken("ephemeral_token");
   * console.log(access_token);
   * @example
   * try {
   * const access_token = await oneLogin.getAccessToken("eph");
   * console.log(access_token);
   * } catch (error) {
   * console.error(error);
   * }
   */
  async getAccessToken(ephemeral_token: string): Promise<string> {
    const response = await axios({
      method: "POST",
      url: `${this.baseURL}/access-token`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ephemeralToken: ephemeral_token,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
    });

    if (response.data.error) {
      throw new OneLoginError(response.data.error);
    }

    if (response.data.code) {
      throw new OneLoginError(response.data.code);
    }

    return response.data.data.token;
  }

  /**
   * Get a user's profile
   * @param {string} access_token - The access token to use to get the user's profile.
   * @returns {Promise<GetUserResponse>}
   * @throws {OneLoginError}
   * @example
   * const profile = await oneLogin.getUser("access_token");
   * console.log(profile);
   * @example
   * try {
   * const profile = await oneLogin.getUser("access_token");
   * console.log(profile);
   * } catch (error) {
   * console.error(error);
   * }
   */
  async getUser(access_token: string): Promise<GetUserResponse> {
    const response = await axios({
      method: "POST",
      url: `${this.baseURL}/get-user`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        accessToken: access_token,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
    });

    if (response.data.error) {
      throw new OneLoginError(response.data.error);
    }

    if (response.data.code) {
      throw new OneLoginError(response.data.code);
    }

    return response.data.data;
  }

  /**
   * Revoke an access token
   * @param {string} access_token - The access token to revoke.
   * @returns {Promise<boolean>}
   * @throws {OneLoginError}
   * @example
   * await oneLogin.revokeAccessToken("access_token");
   * @example
   * try {
   *  await oneLogin.revokeAccessToken("access_token");
   * } catch (error) {
   * console.error(error);
   * }
   */
  async revokeAccessToken(access_token: string): Promise<boolean> {
    const response = await axios({
      method: "POST",
      url: `${this.baseURL}/revoke-token`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        accessToken: access_token,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
    });

    if (response.data.error) {
      throw new OneLoginError(response.data.error);
    }

    if (response.data.code) {
      throw new OneLoginError(response.data.code);
    }

    return true;
  }

  /**
   * Send a notification to a user
   * @param {string} access_token - The access token to use to send the notification.
   * @param {{title: string, body: string}} notification - The notification to send.
   * @returns {Promise<boolean>}
   * @throws {OneLoginError}
   * @example
   * await oneLogin.notify("access_token", {title: "Hello", body: "World"});
   * @example
   * try {
   * await oneLogin.notify("access_token", {title: "Hello", body: "World"});
   * } catch (error) {
   * console.error(error);
   * }
   */
  async notify(
    access_token: string,
    notification: { title: string; body: string }
  ): Promise<boolean> {
    const response = await axios({
      method: "POST",
      url: `${this.baseURL}/notify`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        accessToken: access_token,
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        notification,
      },
    });

    if (response.data.error) {
      throw new OneLoginError(response.data.error);
    }

    if (response.data.code) {
      throw new OneLoginError(response.data.code);
    }

    return true;
  }
}
