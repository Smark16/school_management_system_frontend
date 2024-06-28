import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Geo = () => {
  const [lat, setLat] = useState(localStorage.getItem('latitude') || '');
  const [long, setLong] = useState(localStorage.getItem('longitude') || '');
  const [otherLat, setOtherLat] = useState('');
  const [otherLong, setOtherLong] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (lat && long) {
      localStorage.setItem('latitude', lat);
      localStorage.setItem('longitude', long);
    }
  }, [lat, long]);

  const handleGeo = () => {
    if (!navigator.geolocation) {
      console.log("Browser doesn't support Geolocation API");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLong(longitude);
          console.log('Current Latitude:', latitude);
          console.log('Current Longitude:', longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  // Fix for default icon issue in Leaflet
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  const handleGeocode = async (e) => {
    e.preventDefault();
    const GOOGLE_API_KEY = 'AIzaSyCkuWzPL0jBc4TUVf40qZ6jJ95PKvKjcio';
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
      );
      if (response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setOtherLat(location.lat);
        setOtherLong(location.lng);
        console.log('Geocoded Latitude:', location.lat);
        console.log('Geocoded Longitude:', location.lng);
        console.log('Address:', address);
      }
    } catch (error) {
      console.error("Error fetching the geocode data: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleGeo}>Get Location</button>
      <h1>Coordinates</h1>
      {lat && <p>Latitude: {lat}</p>}
      {long && <p>Longitude: {long}</p>}

      <form onSubmit={handleGeocode}>
        <div>
          <label>Address: </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Get Location</button>
      </form>

      <MapContainer center={lat && long ? [lat, long] : [0, 0]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lat && long && (
          <Marker position={[lat, long]}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {otherLat && otherLong && (
          <Marker position={[otherLat, otherLong]}>
            <Popup>{address}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Geo;
