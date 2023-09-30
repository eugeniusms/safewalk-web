import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";
import Image from "next/image";
import pointInPolygon from "point-in-polygon";
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "src/components/elements/Layout";
import map_setup from "src/services/map_setup_data.json";
import useShareAddressStore from "src/stores/maps";

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
  const [address, setAddress] = useState("");
  const libraries = ["places"];
  const { showShareAddress, setShowShareAddress } = useShareAddressStore();

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

  const getAddressFromCoordinates = (coordinates: any) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: coordinates }, (results: any, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address.slice(0, 64) + "...");
      } else {
        setAddress("Address not found");
      }
    });
  };

  console.log(userLocation);

  const showPinHandler = () => {
    setShowShareAddress(!showShareAddress);
    getAddressFromCoordinates(userLocation);
  };

  const shareLocHandler = () => {
    if (userLocation) {
      const latitude = userLocation.lat;
      const longitude = userLocation.lng;
      const message = "Please, check out my location :(";

      // Construct the WhatsApp share URL with the location and message
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        message
      )}&location=${latitude},${longitude}`;

      // Open WhatsApp in a new tab or the WhatsApp app if available
      window.open(whatsappUrl, "_blank");
    }
  };

  return isLoaded ? (
    <Layout>
      {/* Periksa apakah userLocation berada dalam suatu polygon */}
      {userLocation &&
        polygons.some((polygon) =>
          pointInPolygon(
            [userLocation.lat, userLocation.lng],
            polygon.map((coord) => [coord.lat, coord.lng])
          )
        ) && (
          <div className="absolute z-50 left-0 right-0 mx-auto">
            <div className="w-full text-white font-bold">
              <div className="flex items-center bg-[#BD0000]/50 w-11/12 mx-4 my-4 rounded-2xl">
                <Image
                  src="/assets/icons/caution.svg"
                  width={70}
                  height={70}
                  alt="caution"
                />
                <div>
                  <div className="flex justify-center">Caution!</div>
                  <div className="flex justify-center">
                    Entering High Risk Area
                  </div>
                </div>
                <Image
                  src="/assets/icons/caution.svg"
                  width={70}
                  height={70}
                  alt="caution"
                />
              </div>
            </div>
          </div>
        )}
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
              url: showShareAddress
                ? "/assets/icons/pin-person.png"
                : "/assets/icons/pin.png",
              scaledSize: showShareAddress
                ? new window.google.maps.Size(80, 80)
                : new window.google.maps.Size(64, 64),
            }}
          />
        )}
        <button
          className={`absolute z-50 ${
            showShareAddress ? "bottom-28" : "bottom-72"
          } right-2 mx-auto`}
          onClick={showPinHandler}
        >
          <Image
            src="/assets/icons/show-gps.svg"
            width={64}
            height={64}
            alt="caution"
          />
        </button>
        {!showShareAddress && (
          <div className="absolute z-50 left-0 right-0 bottom-24 mx-auto">
            <div className="w-full text-white">
              <div className="flex items-center bg-[#0D0D0D] w-11/12 mx-4 my-4 rounded-2xl">
                <div>
                  <div className="text-white/20 text-sm px-4 pt-4 pb-2">
                    Your Location
                  </div>
                  <div className="flex justify-center items-center gap-3 px-4">
                    <Image
                      src="/assets/icons/pin-loc.svg"
                      width={32}
                      height={32}
                      alt="caution"
                    />
                    <div className="text-sm font-semibold">{address}</div>
                  </div>
                  <div
                    className="flex justify-center items-center gap-3 px-4 py-4"
                    onClick={shareLocHandler}
                  >
                    <Image
                      src="/assets/icons/cta-share.png"
                      width={310}
                      height={310}
                      alt="caution"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
