import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  MarkerClustererF,
} from "@react-google-maps/api";
import SearchBox from "./SearchBox";
import styles from "./Map.module.css";

type MarkerType = {
  markerPos: any[];
};

type MapOptions = google.maps.MapOptions;
type LatLngLiteral = google.maps.LatLng;
const center = { lat: 44, lng: -99 };

const Map = ({ markerPos }: MarkerType) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [pos, setPos] = useState<LatLngLiteral>();

  const mapRef = useRef<GoogleMap>();

  const showhideInfohandler = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected((prev) =>
        prev.filter((e) => selected.indexOf(e) !== selected.indexOf(idx))
      );
    } else {
      setSelected([idx]);
    }
  };
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "301d7e44c6138568",
      disableDefaultUI: true,
      // clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <h1>searchbox</h1>
        <SearchBox
          setPos={(position: LatLngLiteral) => {
            setPos(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <div>
        <GoogleMap
          zoom={3.5}
          center={center}
          mapContainerClassName={styles.mapContainer}
          onLoad={onLoad}
          options={options}
        >
          {pos ? (
            <MarkerF position={pos} />
          ) : (
            markerPos.map((e: any, idx: number) => (
              <MarkerF
                key={idx}
                position={{ lat: +e.latitude, lng: +e.longitude }}
                onClick={() => showhideInfohandler(idx)}
                icon={"./park-icon.png"}
              >
                {selected.includes(idx) && (
                  <InfoWindowF
                    // key={idx}
                    position={{ lat: +e.latitude, lng: +e.longitude }}
                    onCloseClick={() => showhideInfohandler(idx)}
                  >
                    <div>{e.fullName}</div>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

// <MarkerClustererF>
//             {(clusterer) => {
//               return (
//                 <>
//                   {markerPos.map((e: any, idx: number) => (
//                     <MarkerF
//                       key={idx}
//                       position={{ lat: +e.latitude, lng: +e.longitude }}
//                       onClick={() => showhideInfohandler(idx)}
//                       icon={"./park-icon.png"}
//                       clusterer={clusterer}
//                     >
//                       {selected.includes(idx) && (
//                         <InfoWindowF
//                           // key={idx}
//                           position={{ lat: +e.latitude, lng: +e.longitude }}
//                           onCloseClick={() => showhideInfohandler(idx)}
//                         >
//                           <div>{e.fullName}</div>
//                         </InfoWindowF>
//                       )}
//                     </MarkerF>
//                   ))}
//                 </>
//               );
//             }}
//           </MarkerClustererF>
