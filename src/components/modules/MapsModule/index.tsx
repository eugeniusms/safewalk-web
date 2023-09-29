import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "src/components/elements/Layout";
import map_setup from "src/services/map_setup_data.json";

// Import komponen Polygon
import { Polygon } from "@react-google-maps/api";

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

  // Data koordinat untuk polygon
  const polygons = [
    [
      { lat: -6.356488427865999, lng: 106.82377963506234 },
      { lat: -6.355976518224316, lng: 106.81888727640391 },
      { lat: -6.356573549787702, lng: 106.81571147654967 },
      { lat: -6.361009296004702, lng: 106.8147242951762 },
      { lat: -6.363440494561178, lng: 106.81729923825334 },
      { lat: -6.363142000479635, lng: 106.82167670245563 },
    ],
    // Tambahkan data koordinat polygon lainnya di sini
  ];

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
        {/* Tampilkan polygon-polygon di peta */}
        {polygons.map((polygon, index) => (
          <Polygon
            key={index}
            path={polygon}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            }}
          />
        ))}
      </GoogleMap>
    </Layout>
  ) : (
    <></>
  );
};

export default React.memo(MapsModule);
