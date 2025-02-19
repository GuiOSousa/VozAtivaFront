import axios from "axios";

const baseUrl = 'https://vozativaapi20250219193436.azurewebsites.net'

const api = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
