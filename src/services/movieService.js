import http from "./httpService";
import { ApiEndpoint } from "./../config.json";

export async function getMovies() {
  return await http.get(ApiEndpoint + "/movies");
}

export async function deleteMovie(movieId) {
  return await http.delete(ApiEndpoint + `/movies/${movieId}`);
}

export async function getMovie(movieId) {
  return await http.get(ApiEndpoint + `/movies/${movieId}`);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(ApiEndpoint + `/movies/${movie._id}`, body);
  }
  return http.post(ApiEndpoint + `/movies`, movie);
}
