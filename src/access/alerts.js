import axios from "axios";

export default async function getAlerts  () {
  const baseUrl = `https://localhost:7273`

  try {
    const response = await axios.get(`${baseUrl}/Alert`);
    return response.data
  } catch (error) {
    throw new Error("Falha na comunicação com a API VozAtiva")
  }
}
