import api from "../axios/api";

export default async function getAlerts  () {
  try {
    const response = await api.get('/alert');
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Falha na comunicação com a API VozAtiva")
  }
}
