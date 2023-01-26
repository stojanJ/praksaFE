import { useQuery } from "@tanstack/react-query";
import { movieService } from "../Services/MovieService";
import { Link } from "react-router-dom";
import TruncateMarkup from "react-truncate-markup";

const Home: React.FC<{}> = (props: any) => {
  const { isError, isStale, isLoading, data, error } = useQuery(
    ["movies"],
    movieService.fetchAllMovies,
    { staleTime: 3000 }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      {data.movie &&
        data.movie.map((movie: any) => (
          <li key={movie.id}>
            <Link to={`/moive/${movie.id}`}> {movie.title}</Link>
            <img src={movie.url} />
            <TruncateMarkup lines={1}>
              <p>Description:{movie.description}</p>
            </TruncateMarkup>
            {movie.genre}
          </li>
        ))}
    </div>
  );
};
export default Home;
