import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import styles from "./SmallMap.module.css";

const center = { lat: 44, lng: -99 };

const SmallMap = ({ e }: any) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbhc-B23y1r9Ic4ocp4FkLnQ2OnXevrc8",
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={7}
      center={{ lat: +e.latitude, lng: +e.longitude }}
      mapContainerClassName={styles.mapContainer}
    >
      <MarkerF position={{ lat: +e.latitude, lng: +e.longitude }} />
    </GoogleMap>
  );
};

export default SmallMap;
