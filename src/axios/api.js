import axios from "axios";

const baseUrl = 'https://localhost:7273'

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
