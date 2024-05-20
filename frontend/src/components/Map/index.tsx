import React, { useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

const MapCustom:React.FC<{longitude: number; latitude: number}> = ({longitude, latitude}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [longitude, latitude], zoom: 16 });
    }
  }, [longitude, latitude]);

  return (
    <Map
    mapLib={mapboxgl}
    initialViewState={{
      longitude: longitude,
      latitude: latitude,
      zoom: 16
    }}
    style={{width: '100%', height: '100%'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken='pk.eyJ1IjoiYW5odHJhbngxMjMiLCJhIjoiY2x3ZXRveDlxMWt1azJxcDA5eWJ2MGY2dCJ9.VxaY6H_ilq6Jl8PZNsPbqw'
    onLoad={(e) => (mapRef.current = e.target)}
  >
    <Marker longitude={longitude} latitude={latitude} anchor="center" color="red" />
  </Map>)
}

export default MapCustom