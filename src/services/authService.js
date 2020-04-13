import http from "./httpService";
import JwtDecoder from "jwt-decode";

import { ApiEndpoint } from "./../config.json";

const authEndPoint = ApiEndpoint + "/auth";
const tokenKey = "token";

http.setJwt(tokenKey);

export async function login(credentials) {
  const { data: jwt } = await http.post(authEndPoint, credentials);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    return JwtDecoder(jwt);
  }
  return null;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
};
