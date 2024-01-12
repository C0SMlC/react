import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import propTypes from "prop-types";
import { useCities } from "../contexts/CitiesContext";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";

function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={{ lat: city.position.lat, lng: city.position.lng }}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}

        <ChangeCenter mapPosition={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.setView(mapPosition);
  return null;
}

function DetectClick() {
  const navigator = useNavigate();

  const map = useMap();
  map.on("click", (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    navigator(`/app/form?lat=${lat}&lng=${lng}`);
  });
}

ChangeCenter.propTypes = {
  mapPosition: propTypes.object.isRequired,
};

export default Map;
