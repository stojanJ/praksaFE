import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { movieService } from "../Services/MovieService";
import MovieList from "../Components/MovieList";

const Home: React.FC<{}> = (props: any) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const { isError, isLoading, data, isFetching, isPreviousData } = useQuery(
    ["movies", page],
    () => movieService.fetchAllMovies(page)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  console.log(data?.total_pages);
  return (
    <div>
      {data?.movies &&
        data.movies.map((movie) => <MovieList key={movie.id} movie={movie} />)}
      <span>Current Page: {page}</span>
      <button
        onClick={() => {
          setPage((old) => Math.max(old - 1, 1));
          queryClient.invalidateQueries(["movies"]);
        }}
        disabled={page === 1}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPreviousData && data?.total_pages) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPreviousData || !data?.total_pages}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </div>
  );
};
export default Home;
