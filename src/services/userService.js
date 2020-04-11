import http from "./httpService";
import { ApiEndpoint } from "./../config.json";

const userEndPoint = ApiEndpoint + "/users";

export async function register(credentials) {
  console.log(credentials);
  return await http.post(userEndPoint, credentials);
}
