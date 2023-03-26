import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  MarkerClustererF,
} from "@react-google-maps/api";

import styles from "./Loadmap.module.css";

const center = { lat: 44, lng: -99 };

type marker = {
  markerPos: any[];
};

const LoadMap = ({ markerPos }: marker) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbhc-B23y1r9Ic4ocp4FkLnQ2OnXevrc8",
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map markerPos={markerPos} />;
};

const Map = ({ markerPos }: marker) => {
  const [selected, setSelected] = useState<number[]>([]);

  const showhideInfohandler = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected((prev) =>
        prev.filter((e) => selected.indexOf(e) !== selected.indexOf(idx))
      );
    } else {
      setSelected([idx]);
    }
  };

  return (
    <GoogleMap
      zoom={3}
      center={center}
      mapContainerClassName={styles.mapContainer}
    >
      <MarkerClustererF maxZoom={6}>
        {(clusterer) => {
          console.log("loading clusters");
          return (
            <>
              {markerPos.map((e: any, idx: number) => (
                <MarkerF
                  key={idx}
                  position={{ lat: +e.latitude, lng: +e.longitude }}
                  onClick={() => showhideInfohandler(idx)}
                  clusterer={clusterer}
                >
                  {selected.includes(idx) && (
                    <InfoWindowF
                      position={{ lat: +e.latitude, lng: +e.longitude }}
                      onCloseClick={() => showhideInfohandler(idx)}
                    >
                      <div>{e.fullName}</div>
                    </InfoWindowF>
                  )}
                </MarkerF>
              ))}
            </>
          );
        }}
      </MarkerClustererF>
    </GoogleMap>
  );
};

export default LoadMap;
