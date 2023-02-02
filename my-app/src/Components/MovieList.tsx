import { Link } from "react-router-dom";
import IMovie from "../Types/Imovie";
import LikeDislike from "../Components/LIkeDislike";

const MovieList = ({ movie }: { movie: IMovie }) => {
  return (
    <div className="card" style={{ width: "80%" }}>
      <h3 className="card-title" key={movie.id}>
        <Link to={`/movies/${movie.id}`}> {movie.title}</Link>
      </h3>
      <img className="card-img-top" alt="url " src={movie.url} />
      {movie.description && movie.description.length > 70
        ? `${movie.description.substring(0, 70)}...`
        : movie.description}
      <br />
      <p>Genre: {movie.genre} </p>
      <LikeDislike movie={movie} />
    </div>
  );
};
export default MovieList;
