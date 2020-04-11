import http from "./httpService";
import { ApiEndpoint } from "./../config.json";

const authEndPoint = ApiEndpoint + "/auth";

export async function login(credentials) {
  return await http.post(authEndPoint, credentials);
}
