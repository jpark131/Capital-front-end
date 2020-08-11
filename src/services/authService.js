import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const endpoint = config.url + "/login";
const tokenKey = "token";

export async function login({ email, password }) {
  const { data: jwt } = await http.post(endpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function logInWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getUser,
  logInWithJwt,
  getJwt,
};
