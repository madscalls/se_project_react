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

export default api;
