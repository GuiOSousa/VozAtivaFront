import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import getAlerts from "../access/alerts";
import { createRoot } from "react-dom/client";
import MapPopup from "./CreateAlertPopUp";

const MapComponent = () => {
	useEffect(() => {
		const map = L.map("map").setView([-23.232896, -45.895818], 13);

	
		// Adiciona os tiles do OpenStreetMap
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		
		async function updateAlerts() {
			const alerts = await getAlerts()
		
			alerts.forEach(a => {
				let col
				
				if (a["alertTypeId"] === 1) {
					col = "green"
				} else if (a["alertTypeId"] === 2) {
					col = "blue"
				} else if (a["alertTypeId"] === 3) {
					col = "red"
				} else {
					col = "yellow"
				}
		
				let mk = L.circleMarker([a["latitude"], a["longitude"]], {
					"fillColor": col,
					"color": col
				}).addTo(map)
				mk.bindPopup(`<b>${a["title"]}</b><br>${a["description"]}`)
			})
		
		}

		map.on("popupclose", updateAlerts)
		map.on("moveend", updateAlerts)
		map.on("zoom", updateAlerts)

		// Evento de clique no mapa
		const popup = L.popup({
			maxWidth: 250, // Define uma largura máxima para o popup
			minWidth: 220, // Define uma largura mínima
			keepInView: true, // Mantém o popup visível dentro da tela
		});

		const onMapClick = (e) => {
			const { lat, lng } = e.latlng;

			// Criar um contêiner div para o React renderizar o componente
			const container = document.createElement("div");

			// Renderizar o componente React no contêiner
			createRoot(container).render(<MapPopup lat={lat} lng={lng} />);

			// Definir o conteúdo do popup como o contêiner renderizado
			popup.setLatLng(e.latlng).setContent(container).openOn(map);
		};

		// Adicionar o evento de clique ao mapa
		map.on("click", onMapClick);

		// Cleanup para evitar vazamentos de memória
		return () => {
			map.off("click", onMapClick);
			map.remove();
		};
	}, []);

	return (
		<div
			id="map"
			style={{
				height: "800px",
				width: "100%",
			}}
		></div>
	);
};

export default MapComponent;
