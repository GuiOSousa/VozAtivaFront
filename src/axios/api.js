import axios from "axios";

const baseUrl = 'https://api-mongo-tlli.onrender.com';

const api = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
