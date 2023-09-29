import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "src/components/elements/Layout";
import map_setup from "src/services/map_setup_data.json";

export const MapsModule: React.FC = () => {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(14.2);
  const [center, setCenter] = useState(map_setup.center);
  const [polygons, setPolygons] = useState<
    Array<Array<{ lat: number; lng: number }>>
  >([]);

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

  useEffect(() => {
    axios.get("/api/maps/polygon").then((response: any) => {
      const data = response.data;
      const convertedArr = [];
      for (let d of data) {
        convertedArr.push(d.coordinates);
      }
      setPolygons(convertedArr);
    });
  }, []);

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
              strokeColor: "#822237",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#571f23",
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
