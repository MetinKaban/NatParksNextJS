import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  MarkerClusterer,
} from "@react-google-maps/api";

import styles from "./Loadmap.module.css";

const center = { lat: 44, lng: -99 };

type MarkerType = {
  markerPos: any[];
};

const LoadMap = ({ markerPos }: MarkerType) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbhc-B23y1r9Ic4ocp4FkLnQ2OnXevrc8",
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map markerPos={markerPos} />;
};

const Map = ({ markerPos }: MarkerType) => {
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
      {markerPos.map((e: any, idx: number) => (
        <MarkerF
          key={idx}
          position={{ lat: +e.latitude, lng: +e.longitude }}
          onClick={() => showhideInfohandler(idx)}
          onLoad={() => console.log('mattoko')}
        >
          {selected.includes(idx) && (
            <InfoWindowF
              key={idx}
              position={{ lat: +e.latitude, lng: +e.longitude }}
              onCloseClick={() => showhideInfohandler(idx)}
            >
              <div className={styles.info}>{e.fullName}</div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default LoadMap;

{
  /* <MarkerClusterer
  maxZoom={6}
  averageCenter={true}
  // onClick={() => console.log("mattoko")}
  onLoad={() => console.log("mattoko")}
  ignoreHidden={true}
>
  {(clusterer) => {
    return (
      <div>
        {markerPos.map((e: any, idx: number) => (
          <Marker
            key={idx}
            position={{ lat: +e.latitude, lng: +e.longitude }}
            onClick={() => showhideInfohandler(idx)}
            clusterer={clusterer}
          >
            {selected.includes(idx) && (
              <InfoWindow
                position={{ lat: +e.latitude, lng: +e.longitude }}
                onCloseClick={() => showhideInfohandler(idx)}
              >
                <div>{e.fullName}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </div>
    );
  }}
</MarkerClusterer>; */
}
