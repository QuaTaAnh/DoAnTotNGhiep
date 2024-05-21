import React, { useEffect, useRef, useState } from 'react'
import Map, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

interface LocationAddress {
  longitude: number
  latitude: number
}

const MapCustom:React.FC<{address: string; disable?: boolean}> = ({disable, address = ""}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [locationAdd, setLocationAdd] = useState<LocationAddress>({longitude: 105.782422, latitude: 21.017688});

  useEffect(() =>{
    const getLocationAddress = async () => {  
      try {
        const { data } = await axios.get(
          `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoiYW5odHJhbngxMjMiLCJhIjoiY2x3ZXRveDlxMWt1azJxcDA5eWJ2MGY2dCJ9.VxaY6H_ilq6Jl8PZNsPbqw`
        );
        if (data.features && data.features.length > 0) {
          const { coordinates } = data.features[0].geometry;
          setLocationAdd({ longitude: coordinates[0], latitude: coordinates[1] });
        }
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    }
    getLocationAddress();
  }, [address])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [locationAdd.longitude, locationAdd.latitude], zoom: 14 });
    }
  }, [locationAdd.longitude, locationAdd.latitude]);

  return (
    <Map
    mapLib={mapboxgl}
    initialViewState={{
      longitude: locationAdd.longitude,
      latitude: locationAdd.latitude,
      zoom: 16
    }}
    style={{width: '100%', height: '100%'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken='pk.eyJ1IjoiYW5odHJhbngxMjMiLCJhIjoiY2x3ZXRveDlxMWt1azJxcDA5eWJ2MGY2dCJ9.VxaY6H_ilq6Jl8PZNsPbqw'
    onLoad={(e) => (mapRef.current = e.target)}
    dragPan={disable ? false : true}
    scrollZoom={disable ? false : true}
    dragRotate={disable ? false : true}
    keyboard={disable ? false : true}
    doubleClickZoom={disable ? false : true}
    touchZoomRotate={disable ? false : true}
  >
    <Marker longitude={locationAdd.longitude} latitude={locationAdd.latitude} color="red" />
  </Map>)
}

export default MapCustom