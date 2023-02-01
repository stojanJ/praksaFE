import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { movieService } from "../Services/MovieService";
import MovieList from "../Components/MovieList";
import useDebounce from "../Hooks/useDebounce";

const Home: React.FC<{}> = (props: any) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 750);
  const [selectedGenre, setSelectedGenre] = useState("");

  const { isError, isLoading, data, isFetching, isPreviousData } = useQuery(
    ["movie", debouncedSearch, selectedGenre],
    () => {
      return movieService.fetchAllMovies(page, debouncedSearch, selectedGenre);
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter your search term here"
        />
      </div>
      <select onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="" label="Select a genre">
          Select a genre
        </option>
        <option value="action" label="action">
          Action
        </option>
        <option value="drama" label="drama">
          Drama
        </option>
        <option value="documentary" label="documentary">
          Documentary
        </option>
        <option value="horror" label="horror">
          Horror
        </option>
        <option value="comedy" label="comedy">
          Comedy
        </option>
      </select>
      <div>
        {data?.movies &&
          data.movies.map((movie) => (
            <MovieList key={movie.id} movie={movie} />
          ))}
        <span>Current Page: {page}</span>
        <button
          onClick={() => {
            setPage((old) => --old);
            queryClient.invalidateQueries(["movies"]);
          }}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (!isPreviousData && data?.total_pages) {
              setPage((old) => ++old);
            }
          }}
          disabled={isPreviousData || !data?.total_pages}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}
      </div>
    </>
  );
};
export default Home;
