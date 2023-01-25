import { httpService } from "./HttpService";

class MovieService {
  fetchAllMovies = async () => {
    try {
      const response = await httpService.axiosInstance.get("/movies");
      return response.data;
    } catch {
      console.error("GET movies error");
    }
  };
}

export const movieService = new MovieService();
