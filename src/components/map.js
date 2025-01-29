import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import getData from "../access/localData";
import getAlerts from "../access/alerts";

const MapComponent = () => {
	useEffect(() => {
		const map = L.map("map").setView([-23, -46], 13);

	
		// Adiciona os tiles do OpenStreetMap
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		
		function updateAlerts() {
			const alerts = getData() // getAlerts()
		
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

		map.on("moveend", updateAlerts)
		map.on("zoom", updateAlerts)

		// Evento de clique no mapa
		const popup = L.popup(); 
		const onMapClick = (e) => {
			popup
				.setLatLng(e.latlng)
				.setContent(
					"You clicked the map at " + e.latlng.toString()
				)
				.openOn(map);
		};
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
