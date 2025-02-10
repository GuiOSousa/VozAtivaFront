import axios from "axios";

const baseUrl = 'https://vozativa-badpdshcc4e7ddfv.brazilsouth-01.azurewebsites.net'

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
