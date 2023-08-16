import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "src/components/elements/Layout";
import map_setup from "src/services/map_setup_data.json";

export const MapsModule: React.FC = () => {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(14.2);
  const [center, setCenter] = useState(map_setup.center);

  const { isLoaded } = useJsApiLoader({
    id: "6f595d9fea01980a",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(map_setup.center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setZoom(14.7);
    }, 300);
  }, []);

  console.log("CENTER: ", center);

  return isLoaded ? (
    <Layout>
      <GoogleMap
        mapContainerStyle={map_setup.container_style}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={map_setup.map_id}
      >
        <></>
      </GoogleMap>
    </Layout>
  ) : (
    <></>
  );
};

export default React.memo(MapsModule);
