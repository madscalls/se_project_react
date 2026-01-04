const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.mcallahanse.jumpingcrab.com"
    : "http://localhost:3001";
import { handleServerResponse } from "./api";

export const signUp = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(handleServerResponse)
    .then((data) => {
      if (!data.token) {
        return Promise.reject("No token returned from server");
      }

      localStorage.setItem("jwt", data.token);
      return data;
    });
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
