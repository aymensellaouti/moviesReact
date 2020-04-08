import React, { useState } from "react";
import { deleteMovie, getMovies } from "../../services/movieService";
import Pagination from "../../common/pagination.component";
import { paginate } from "../../utils/paginate";
import Filter from "../../common/filter.component";
import { getGenres } from "../../services/genreService";
import { useEffect } from "react";
import _ from "lodash";
import MoviesTable from "./movies-table";
import { toast } from "react-toastify";
const Movies = ({ history }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(null);
  const [sortField, setSortField] = useState({ column: "", orderBy: "asc" });
  const [search, setSearch] = useState("");
  useEffect(() => {
    const httpGetData = async (getData, setData) => {
      const { data } = await getData();
      setData(data);
    };
    httpGetData(getMovies, setMovies);
    httpGetData(getGenres, setGenres);
    /*     setGenres(getGenres());
    setMovies(getMovies());
 */
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
    const previousState = movies;
    const newMovies = movies.filter((movie) => movie._id !== id);
    setMovies(newMovies);
    const deleteHttpMovies = async () => {
      await deleteMovie(id);
    };
    try {
      deleteHttpMovies();
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The movie has alredy been deleted");
      setMovies(previousState);
    }
  };
  function filter(movies) {
    if (genre == null) {
      return movies;
    }
    if (search !== "") setSearch("");
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
    if (genre == null && search.length) {
      filtredMovies = movies.filter((movie) => movie.title.search(search) > -1);
      if (page !== 1) {
        setPage(1);
      }
    }
    const moviesCount = filtredMovies.length;
    filtredMovies = sort(filtredMovies);
    filtredMovies = paginate(filtredMovies, page, pageSize);
    return {
      moviesToDisplay: filtredMovies,
      moviesCount,
    };
  }
  const handleAddMovieButtonClick = () => {
    history.push("/movies/new");
  };
  const handleChange = ({ target: input }) => {
    setSearch(input.value);
  };
  const { moviesToDisplay, moviesCount } = processMoviesToDisplay();
  if (!moviesCount && search === "")
    return <p>There are no movies in the database</p>;

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
          <button
            onClick={handleAddMovieButtonClick}
            className="btn btn-primary"
          >
            New Movie
          </button>
          <p>Showing {moviesCount} movies in the database.</p>
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
            className="form-control"
          />
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
