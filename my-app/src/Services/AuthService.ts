import { httpService } from "./HttpService";

class AuthService {
  axiosInstance: any;
  data: any;

  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.setAxiosAuthorizationHeader();
  }

  setAxiosAuthorizationHeader(tokenParam = null) {
    let token = tokenParam ? tokenParam : localStorage.getItem("token");

    if (token) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }

  async register(data: any) {
    console.log(data, "tu sam");
    const response = await this.axiosInstance.post("/register", data);
    localStorage.setItem("token", response.data.authorisation.token);
    this.setAxiosAuthorizationHeader(response.data.authorisation.token);

    return response;
  }
}

export const authService = new AuthService();
