import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../../common/input";
import _ from "lodash";
import {
  handlePropertyFormChange,
  validateFormWithJoi,
  validateFormProperty,
  renderSubmitButton,
} from "../../utils/formUtils";
import Joi from "@hapi/joi";
import { getGenres } from "../../services/genreService";
import { saveMovie, getMovie } from "../../services/movieService";
import { toast } from "react-toastify";

const MovieForm = ({ history, match }) => {
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState({
    title: "",
    genreId: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  });
  const [errors, setErrors] = useState({});
  const httpGetData = async (getData, setData) => {
    const { data } = await getData();
    setData(data);
  };
  const getHttpMovies = async () => {
    const movieId = match.params.id;
    const { data } = await getMovie(movieId);
    const newMovie = mapToViewModel(data);
    setMovie(newMovie);
  };
  async function populateMovies() {
    const movieId = match.params.id;
    try {
      if (movieId === "new") {
        setMovie({
          title: "",
          genreId: "",
          numberInStock: 0,
          dailyRentalRate: 0,
        });
        return;
      }
      await getHttpMovies();
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The movie does not exist");
      return history.push("/movies");
    }
  }
  useEffect(() => {
    httpGetData(getGenres, setGenres);
    populateMovies();
  }, []);
  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  const schemaObject = {
    _id: Joi.string().allow(""),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
  };
  const schema = Joi.object(schemaObject);
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Validation
    const formErrors = validate();

    setErrors(formErrors || {});
    if (!_.isEmpty(errors)) return;
    try {
      await saveMovie(movie);
    } catch (error) {
      toast.error("erreur : ", error);
    }
    history.push("/movies");
  };
  const validate = () => {
    const errors = validateFormWithJoi(schema, movie);
    /*     console.log(errors); */
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
        id="genreId"
        className="form-control"
        onChange={handleChange}
        name="genreId"
      >
        <option value=""></option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
      {errors["genre"] && (
        <div className="alert alert-danger">{errors["genre"]}</div>
      )}
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
      {renderSubmitButton("Add Movie", validate, handleSubmit)}
    </form>
  );
};

export default MovieForm;
