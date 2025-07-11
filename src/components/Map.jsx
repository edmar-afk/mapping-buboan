import { useState } from "react";import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../assets/api";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import FeedBack from "./FeedBack";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const redIcon = new L.Icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

function ClickHandler({ onClick }) {
	useMapEvents({
		click(e) {
			onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
		},
	});
	return null;
}

function Map() {
	const [, setIsVisible] = useState(false);
	const [coords, setCoords] = useState(null);
	const [categoryPins, setCategoryPins] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);

	const handleClick = (clickedCoords) => {
		setCoords(clickedCoords);
		setIsVisible(true);
	};

	const handleCategorySelect = async (categoryKey) => {
		setActiveCategory(categoryKey);
		try {
			const response = await api.get(`/api/${categoryKey}/`);
			setCategoryPins(response.data);
		} catch (error) {
			console.error(`Error fetching ${categoryKey} data:`, error);
			setCategoryPins([]);
		}
	};

	return (
		<div className="relative">
			<MapContainer
				center={[7.936449, 123.074685]}
				zoom={16}
				style={{ width: "100%", height: "100vh" }}>
				<TileLayer
					url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					attribution="Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics"
				/>
				<ClickHandler onClick={handleClick} />

				{coords && (
					<Marker
						position={[coords.lat, coords.lng]}
						icon={redIcon}>
						<Popup>
							Lat: {coords.lat.toFixed(5)}, Lng: {coords.lng.toFixed(5)}
						</Popup>
					</Marker>
				)}

				{activeCategory &&
					categoryPins
						.filter((item) => item.location && item.location.includes(","))
						.map((item) => {
							const [latStr, lngStr] = item.location.split(",");
							const lat = parseFloat(latStr);
							const lng = parseFloat(lngStr);

							if (isNaN(lat) || isNaN(lng)) return null;

							return (
								<Marker
									key={item.id}
									position={[lat, lng]}
									eventHandlers={{
										mouseover: (e) => {
											e.target.openPopup();
										},
										mouseout: (e) => {
											e.target.closePopup();
										},
									}}>
									<Popup maxWidth={900}>
										{activeCategory === "pwds" ? (
											<>
												Name: {item.people} <br />
												Age: {item.age} <br />
												Gender: {item.gender}
												<br />
												Disability: {item.disable_type}
												<br />
												Source of Income: {item.source_income}
											</>
										) : activeCategory === "infras" ? (
											<>
												Name: {item.name} <br />
												Type: {item.type} <br />
												<img
													src={item.image || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"}
													alt={item.name}
													style={{ width: "100%", height: "auto", marginTop: "5px" }}
												/>
											</>
										) : activeCategory === "seniors" ? (
											<>
												Name: {item.people} <br />
												Age: {item.age} <br />
												Gender: {item.gender}
												<br />
												Purok: {item.purok}
											</>
										) : activeCategory === "households" ? (
											<>
												<table className="table-auto border border-red-300 w-full text-sm">
													<thead className="bg-red-100 text-red-800">
														<tr>
															<th className="border border-red-300 px-4 py-2 text-left">Family Name</th>
															<th className="border border-red-300 px-4 py-2 text-left">Name</th>
															<th className="border border-red-300 px-4 py-2 text-left">Age</th>
															<th className="border border-red-300 px-4 py-2 text-left">Role</th>
															<th className="border border-red-300 px-4 py-2 text-left">Purok</th>
															<th className="border border-red-300 px-4 py-2 text-left">Status</th>
															<th className="border border-red-300 px-4 py-2 text-left">Source of Income</th>
														</tr>
													</thead>
													<tbody>
														{item.members.map((member, idx) => (
															<tr
																key={idx}
																className="hover:bg-red-50">
																{idx === 0 ? (
																	<td
																		className="border border-red-300 px-4 py-2"
																		rowSpan={item.members.length}>
																		{item.family_name}
																	</td>
																) : null}
																<td className="border border-red-300 px-4 py-2">{member.name}</td>
																<td className="border border-red-300 px-4 py-2">{member.age} yrs</td>
																<td className="border border-red-300 px-4 py-2">{member.role}</td>
																<td className="border border-red-300 px-4 py-2">{member.purok}</td>
																<td className="border border-red-300 px-4 py-2">{member.status}</td>
																<td className="border border-red-300 px-4 py-2">{member.source_income}</td>
															</tr>
														))}
													</tbody>
												</table>
											</>
										) : (
											"Unknown category"
										)}
									</Popup>
								</Marker>
							);
						})}
			</MapContainer>

			<Sidebar
				lat={coords?.lat}
				lng={coords?.lng}
				isVisible={true}
				onClose={() => setIsVisible(false)}
				categoryKey={activeCategory}
			/>

			<TopBar
				isVisible={true}
				onCategorySelect={handleCategorySelect}
				activeCategory={activeCategory}
			/>

			<FeedBack />
		</div>
	);
}

export default Map;
