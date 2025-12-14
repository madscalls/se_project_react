const baseUrl = "http://localhost:3001";

const handleResponse = (res) => {
  if (!res.ok) return Promise.reject(`Error: ${res.status}`);
  return res.json();
};

export const signUp = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);
};

export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      if (!data.token) {
        return Promise.reject("No token returned from server");
      }

      localStorage.setItem("jwt", data.token);
      return data;
    })
    .catch((err) => {
      console.error("Sign in error:", err);
      throw err;
    });
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};
