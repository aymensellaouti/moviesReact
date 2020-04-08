import React from "react";
import { useEffect } from "react";
import { getMovie } from "../../services/fakeMovieService";
import { useState } from "react";
import Input from "./../../common/input";
import _ from "lodash";
import {
  handlePropertyFormChange,
  validateFormWithJoi,
  validateFormProperty,
  renderSubmitButton,
} from "./../../utils/formUtils";
import Joi from "@hapi/joi";
import { getGenres } from "../../services/fakeGenreService";
import { saveMovie } from "../../services/fakeMovieService";

const MoviesUpdate = ({ match, history }) => {
  function handleClick() {
    saveMovie(movie);

    history.push("/movies");
  }
  useEffect(() => {
    const selectedMovie = getMovie(match.params.id);
    const newMovie = { ...movie };
    newMovie.title = selectedMovie.title;
    newMovie.genre = selectedMovie.genre._id;
    newMovie.numberInStock = selectedMovie.numberInStock;
    newMovie.dailyRentalRate = selectedMovie.dailyRentalRate;
    setMovie(newMovie);
    /*     if (!movie) {
      history.push("/not-found");
    } */
  }, []);
  const [movie, setMovie] = useState({
    title: "",
    genre: getGenres()[0]._id,
    numberInStock: 0,
    dailyRentalRate: 0,
  });
  const [errors, setErrors] = useState({});
  const schemaObject = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
  };
  const schema = Joi.object(schemaObject);
  const handleSubmit = (event) => {
    event.preventDefault();
    //Validation
    const formErrors = validate();

    setErrors(formErrors || {});
    if (!_.isEmpty(errors)) return;
    const newMovies = saveMovie(movie);
    history.push("/movies");
  };
  const validate = () => {
    const errors = validateFormWithJoi(schema, movie);
    /*     console.log(errors); */
    console.log("errors", errors);
    return errors;
  };
  const validateProperty = ({ name, value }) => {
    return validateFormProperty(schemaObject, name, value);
  };
  const handleChange = ({ target: input }) => {
    handlePropertyFormChange(
      setMovie,
      movie,
      input,
      validateProperty,
      errors,
      setErrors
    );
  };
  const isSelected = (genre) => {
    return genre._id === movie.genre._id ? "selected" : "";
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        identifiar="title"
        label="Title"
        value={movie.title}
        onChange={handleChange}
        type="text"
        error={errors.title}
      ></Input>
      <label htmlFor="genre">Genre</label>
      <select
        id="genre"
        className="form-control"
        onChange={handleChange}
        name="genre"
      >
        {getGenres().map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
      <Input
        identifiar="numberInStock"
        label="Number in Stock"
        value={movie.numberInStock}
        onChange={handleChange}
        type="number"
        error={errors.numberInStock}
      ></Input>
      <Input
        identifiar="dailyRentalRate"
        label="Rate"
        value={movie.dailyRentalRate}
        onChange={handleChange}
        type="number"
        error={errors.dailyRentalRate}
      ></Input>
      {renderSubmitButton("Update Movie", validate, handleSubmit)}
    </form>
  );
};

export default MoviesUpdate;
