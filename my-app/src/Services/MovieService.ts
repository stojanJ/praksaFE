import { httpService } from "./HttpService";
import IMovie from "../Types/Imovie";
class MovieService {
  fetchAllMovies = async (page: number) => {
    try {
      const response = await httpService.axiosInstance.get(
        `/movies?page=${page}`
      );

      const movies: Array<IMovie> = response.data.movie.data.map(
        (movie: IMovie) => ({
          id: movie.id,
          title: movie.title,
          description: movie.description,
          url: movie.url,
          genre: movie.genre,
          user_id: movie.user_id,
        })
      );
      return { movies, total_pages: response.data.movie.last_page };
    } catch {
      console.error("GET movies error");
    }
  };
  postMovies = async (newMovie: IMovie) => {
    try {
      const response = await httpService.axiosInstance.post(
        "/movies",
        newMovie
      );
      return response.data;
    } catch {
      console.error("POST movies error");
    }
  };
}

export const movieService = new MovieService();
