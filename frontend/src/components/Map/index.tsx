import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { LocationAddress } from "../../type";

const MapCustom: React.FC<{ address: string }> = ({ address = "" }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [locationAdd, setLocationAdd] = useState<LocationAddress>({
    longitude: 105.782422,
    latitude: 21.017688,
  });

  useEffect(() => {
    const getLocationAddress = async () => {
      try {
        const { data } = await axios.get(
          `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
            address
          )}&access_token=pk.eyJ1IjoiYW5odHJhbngxMjMiLCJhIjoiY2x3ZXRveDlxMWt1azJxcDA5eWJ2MGY2dCJ9.VxaY6H_ilq6Jl8PZNsPbqw`
        );
        if (data.features && data.features.length > 0) {
          const { coordinates } = data.features[0].geometry;
          setLocationAdd({
            longitude: coordinates[0],
            latitude: coordinates[1],
          });
        }
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };
    if (address) {
      getLocationAddress();
    }
  }, [address]);

  useEffect(() => {
    if (map) {
      map.flyTo({
        center: [locationAdd.longitude, locationAdd.latitude],
        zoom: 14,
      });
    }
  }, [locationAdd.longitude, locationAdd.latitude, map]);

  return (
    <Map
      mapLib={mapboxgl}
      initialViewState={{
        longitude: locationAdd.longitude,
        latitude: locationAdd.latitude,
        zoom: 14,
      }}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiYW5odHJhbngxMjMiLCJhIjoiY2x3ZXRveDlxMWt1azJxcDA5eWJ2MGY2dCJ9.VxaY6H_ilq6Jl8PZNsPbqw"
      onLoad={(e) => {
        setMap(e.target);
      }}
    >
      <Marker
        longitude={locationAdd.longitude}
        latitude={locationAdd.latitude}
        anchor="center"
        color="red"
      />
    </Map>
  );
};

export default MapCustom;
