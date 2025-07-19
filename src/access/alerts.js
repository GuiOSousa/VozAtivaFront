import api from "../axios/api";

export default async function getAlerts (filters) {
  try {
    const response = await api.get('/alert', {"params": filters});
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("Falha na comunicação com a API VozAtiva")
  }
}

let MapFilter = {}

export const setMapFilter = (data) => {
  MapFilter = data
}

export const getMapFilter = () => {
  const returnMapFilter = {}

  Object.keys( MapFilter).forEach(key => {
    if (MapFilter[key] !== "") {
      if (key === "lat" || key === "long") { 
        if (!returnMapFilter["coords"]) { returnMapFilter["coords"] = [] }
        returnMapFilter["coords"][key] = MapFilter[key] }
      else { returnMapFilter[key] = MapFilter[key] }}
  });

  return returnMapFilter
}