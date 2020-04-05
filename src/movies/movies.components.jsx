import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/pagination.component";
import { paginate } from "../utils/paginate";
import Filter from "../common/filter.component";
import { getGenres } from "../services/fakeGenreService";
import { useEffect } from "react";
import _ from "lodash";
import MoviesTable from "../movies-table/movies-table";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(null);
  const [sortField, setSortField] = useState({ column: "", orderBy: "asc" });

  useEffect(() => {
    setGenres(getGenres());
    setMovies(getMovies());
    console.log("useEffect Init");
  }, []);
  function handleLikeClick(movieId) {
    const newMovies = movies.map((movie) => {
      if (movie._id === movieId) {
        movie.like = !movie.like;
        return movie;
      }
      return movie;
    });
    setMovies(newMovies);
  }
  function handleFilterClick(filtredGenre) {
    setGenre(filtredGenre);
    setPage(1);
  }
  function handleSortClick(sortField) {
    setSortField(sortField);
  }
  const changePage = (numPage) => {
    setPage(numPage);
  };
  const handleDeleteClick = (id) => {
    const newMovies = movies.filter((movie) => movie._id !== id);
    setMovies(newMovies);
  };
  function filter(movies) {
    if (genre == null) {
      return movies;
    }
    const filtredMovies = movies.filter(
      (movie) => movie.genre._id === genre._id
    );
    return filtredMovies;
  }
  function sort(movies) {
    const sortedMovies = _.orderBy(
      movies,
      [sortField.column],
      [sortField.orderBy]
    );
    return sortedMovies;
  }
  function processMoviesToDisplay() {
    let filtredMovies = filter(movies, genre);
    const moviesCount = filtredMovies.length;
    filtredMovies = sort(filtredMovies);
    filtredMovies = paginate(filtredMovies, page, pageSize);
    return {
      moviesToDisplay: filtredMovies,
      moviesCount,
    };
  }
  const { moviesToDisplay, moviesCount } = processMoviesToDisplay();
  if (!moviesCount) return <p>There are no movies in the database</p>;

  return (
    <>
      <div className="row">
        <div className="col-3">
          <Filter
            selectedFilter={genre}
            items={genres}
            handleFilterClick={handleFilterClick}
          ></Filter>
        </div>
        <div className="col">
          <p>Showing {moviesCount} movies in the database.</p>
          <div className="row">
            <MoviesTable
              movies={moviesToDisplay}
              sortField={sortField}
              onLike={handleLikeClick}
              onDelete={handleDeleteClick}
              onSort={handleSortClick}
            ></MoviesTable>
            <Pagination
              length={moviesCount}
              itemPerPage={pageSize}
              currentPage={page}
              handleClick={changePage}
            ></Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
