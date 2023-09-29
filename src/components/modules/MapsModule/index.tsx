import { useToast } from "@chakra-ui/react";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import pointInPolygon from "point-in-polygon";
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
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const toast = useToast();

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
    setInterval(() => {
      trackUserLocation(); // Panggil fungsi untuk melacak lokasi pengguna
    }, 1000);
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

  // Fungsi untuk melacak lokasi pengguna
  const trackUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const enteringHighRiskArea = () => {
    toast({
      title: "Entering High Risk Area",
      status: "error",
      position: "top",
      duration: 4000,
      isClosable: true,
    });
  };

  console.log(userLocation);

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
              strokeColor: "#571f23",
              strokeOpacity: 0.35,
              strokeWeight: 0,
              fillColor: "#571f23",
              fillOpacity: 0.35,
            }}
          />
        ))}

        {/* Tampilkan marker lokasi pengguna */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "/assets/icons/pin.png", // Ganti dengan URL gambar marker pengguna Anda
              scaledSize: new window.google.maps.Size(64, 64), // Ukuran marker
            }}
          />
        )}

        {/* Periksa apakah userLocation berada dalam suatu polygon */}
        {userLocation &&
          polygons.some((polygon) =>
            pointInPolygon(
              [userLocation.lat, userLocation.lng],
              polygon.map((coord) => [coord.lat, coord.lng])
            )
          ) &&
          enteringHighRiskArea()}
      </GoogleMap>
    </Layout>
  ) : (
    <></>
  );
};

export default React.memo(MapsModule);

// ASRAMA UI
// -6.343997032690972, 106.82731035118104
// -6.344492220346742, 106.83487291460864
// -6.349240875924529, 106.83323148989543
// -6.348366917130229, 106.8256688691141
