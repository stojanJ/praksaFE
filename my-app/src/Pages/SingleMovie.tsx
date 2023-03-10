import React from "react";
import { useQuery } from "@tanstack/react-query";
import { movieService } from "../Services/MovieService";
import { useParams } from "react-router-dom";

const SingleMovie: React.FC<{}> = (props) => {
  const { movie_id } = useParams();
  console.log(movie_id);

  const {
    isError,
    isLoading,
    data: movie,
  } = useQuery(
    ["movie", movie_id],
    () => movieService.fetchSingleMovie(movie_id),
    {
      enabled: Boolean(movie_id),
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      {!isLoading
        ? movie && (
            <div className="card" style={{ width: "80%" }}>
              <h3 className="card-title" key={movie.id}>
                {movie.title}
              </h3>
              <img className="card-img-top" alt="url " src={movie.url} />

              <p>{movie.description}</p>
              <br />
              <p>Genre: {movie.genre} </p>
            </div>
          )
        : "loading"}
    </div>
  );
};
export default SingleMovie;
