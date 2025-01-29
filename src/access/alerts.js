import axios from "axios";

const getRadiusFromZoom = (zoom, latitude) => {
  const earthCircumference = 40075016.686;
  return (earthCircumference * Math.cos(latitude * Math.PI / 180)) / (2 ** (zoom + 8));
};

export default async function getAlerts  (latitude, longitude, zoom) {
  const baseUrl = `https://VozAtiva`
  const radius = getRadiusFromZoom(zoom, latitude)
  try {
    
    const response = await axios.get(`${baseUrl}/GetByDistance/${latitude}/${longitude}/${radius}`);
    return response.data
  } catch (error) {
    throw new Error("Falha na comunicação com a API VozAtiva")
  }
}

