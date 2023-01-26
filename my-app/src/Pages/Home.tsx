import { useQuery, useQueryClient } from "@tanstack/react-query";
import { movieService } from "../Services/MovieService";
import { Link } from "react-router-dom";
import TruncateMarkup from "react-truncate-markup";

const Home: React.FC<{}> = (props: any) => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(["movies"]);

  const { isError, isStale, isLoading, data, error } = useQuery(
    ["movies"],
    movieService.fetchAllMovies
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="card" style={{ width: 400 }}>
      {data.movie &&
        data.movie.map((movie: any) => (
          <li className="card-title" key={movie.id}>
            <Link to={`/moive/${movie.id}`}> {movie.title}</Link>
            <img className="card-img-top" src={movie.url} />
            <TruncateMarkup lines={1}>
              <p className="card-text">Description:{movie.description}</p>
            </TruncateMarkup>
            <br />
            <p>Genre: {movie.genre} </p>
          </li>
        ))}
    </div>
  );
};
export default Home;
