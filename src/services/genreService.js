import http from "./httpService";
import {ApiEndpoint} from "./../config.json";

export async function getGenres() {
  const genres = await http.get(ApiEndpoint + "/genres");
  return genres;
}
