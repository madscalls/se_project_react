const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
const api = {
  // GET
  getItems() {
    return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
  },

  // POST
  addItem({ name, imageUrl, weather }) {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, imageUrl, weather }),
    }).then(handleServerResponse);
  },

  // DELETE
  removeItem(itemID) {
    return fetch(`${baseUrl}/items/${itemID}`, {
      method: "DELETE",
      headers,
    }).then((res) => {
      if (!res.ok) return Promise.reject(`Error: ${res.status}`);
      return res;
    });
  },
};

//likes & dislike

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

export const updateUser = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
};

export default api;
