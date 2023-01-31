import { httpService } from "./HttpService";
import IMovie from "../Types/Imovie";
class MovieService {
  fetchAllMovies = async (page: number, search: string = "") => {
    try {
      const response = await httpService.axiosInstance.get(
        `/movies?page=${page}&title=${search}`
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
  fetchSingleMovie = async (id: string | undefined) => {
    try {
      const { data } = await httpService.axiosInstance.get(`/movies/${id}`);
      const movie: IMovie = {
        id: data.movie.id,
        title: data.movie.title,
        description: data.movie.description,
        url: data.movie.url,
        genre: data.movie.genre,
        user_id: data.movie.user_id,
      };

      return movie;
    } catch {
      console.error("GET single movies error");
    }
  };
  fetchSearchMovie = async (name: string | undefined) => {
    try {
      const response = await httpService.axiosInstance.get(`/search/${name}`);

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
      return { movies };
    } catch {
      console.error("Search movies error");
    }
  };
}

export const movieService = new MovieService();
