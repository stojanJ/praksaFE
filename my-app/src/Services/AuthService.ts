import { IUser } from "../Types/user";
import { httpService } from "./HttpService";

class AuthService {
  axiosInstance: any;
  authorizationHeader: any;

  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.authorizationHeader = httpService.setAxiosAuthorizationHeader;
  }

  async register(data: IUser) {
    try {
      const response = await this.axiosInstance.post("/register", data);
      localStorage.setItem("token", response.data.authorisation.token);
      this.authorizationHeader(response.data.authorisation.token);
      return response;
    } catch {
      console.error("Register error");
    }
  }

  async login(data: IUser) {
    try {
      const response = await this.axiosInstance.post("/login", data);
      localStorage.setItem("token", response.data.authorisation.token);
      this.authorizationHeader(response.data.authorisation.token);
      return response;
    } catch {
      console.error("Login error");
    }
  }
}

export const authService = new AuthService();
