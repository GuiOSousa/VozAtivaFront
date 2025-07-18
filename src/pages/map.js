import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import getAlerts from "../access/alerts";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Importe o Router
import MapPopup from "../components/CreateAlertPopUp";
import api from "../axios/api";
import getData from "../access/localData";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global
import NotLogedPopup from "../components/notLogedPopup";
import AlertInfoPopup from "../components/alertInfoPopup";

class MapComponent extends React.Component {
	
	componentDidMount() {
		if (this.map) {
			this.map.remove();
		}
		this.map = L.map("map").setView([-23.232896, -45.895818], 13);

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(this.map);

		this.updateAlerts = this.updateAlerts.bind(this);

		this.map.on("popupclose", this.updateAlerts);
		this.map.on("moveend", this.updateAlerts);
		this.map.on("zoom", this.updateAlerts);

		const popup = L.popup({
			maxWidth: 250,
			minWidth: 220,
			keepInView: true,
		});

		const onMapClick = (e) => {
			const container = document.createElement("div");
			const { lat, lng } = e.latlng;

			if (!isLoggedIn) {
				createRoot(container).render(
					<Router>
						<NotLogedPopup popup={popup}/>
					</Router>
				);
				popup.setLatLng(e.latlng).setContent(container).openOn(this.map);
				return;
			}
			createRoot(container).render(
				<Router>
					<MapPopup lat={lat} lng={lng} popup={popup} />
				</Router>
			);

			// Definir o conteúdo do popup como o contêiner renderizado
			popup.setLatLng(e.latlng).setContent(container).openOn(this.map);
		};

		// Adicionar o evento de clique ao mapa
		this.map.on("click", onMapClick);
		this.updateAlerts()

		// Cleanup para evitar vazamentos de memória
		return () => {
			if (this.map) {
				this.map.off();
				this.map.remove();
			}
		};
	}

	async updateAlerts() {
		const alerts = await getAlerts(); // FUNÇÃO LOCAL

		//console.log(await api.get('/Alert'))

		alerts.forEach((a) => {
			let col;

			if (a["type"] === "Environment") {
				col = "green";
			} else if (a["type"] === "Traffic") {
				col = "blue";
			} else if (a["type"] === "Security") {
				col = "red";
			} else {
				col = "yellow";
			}

			if (!a["coords"] || !a["coords"]["lat"] || !a["coords"]["long"]) {
				return
			}

			let mk = L.circleMarker([a["coords"]["lat"], a["coords"]["long"]], {
			fillColor: col,
			color: col,
			}).addTo(this.map);
			mk.bindPopup(AlertInfoPopup(a));
			
		});

		const pane = this.getPane();
	}

	getPane() {
		// Implementação do método getPane
	}

	render() {
		return (
			<div
				id="map"
				style={{
					height: "100vh",
					width: "100%",
				}}
			></div>
		);
	}
}

export default MapComponent;
