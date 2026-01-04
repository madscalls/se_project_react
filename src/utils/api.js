const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.mcallahanse.jumpingcrab.com"
    : "http://localhost:3001";

export const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

const api = {
  getItems() {
    return fetch(`${baseUrl}/items`, {
      headers: { "Content-Type": "application/json" },
    }).then(handleServerResponse);
  },

  addItem({ name, imageUrl, weather }) {
    const token = localStorage.getItem("jwt");

    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, imageUrl, weather }),
    }).then(handleServerResponse);
  },

  removeItem(itemID) {
    const token = localStorage.getItem("jwt");

    return fetch(`${baseUrl}/items/${itemID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(handleServerResponse);
  },

  addCardLike(id) {
    const token = localStorage.getItem("jwt");

    return fetch(`${baseUrl}/items/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(handleServerResponse);
  },

  removeCardLike(id) {
    const token = localStorage.getItem("jwt");

    return fetch(`${baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(handleServerResponse);
  },

  updateUser({ name, avatar }) {
    const token = localStorage.getItem("jwt");

    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    }).then(handleServerResponse);
  },
};

export default api;
