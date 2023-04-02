import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
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

  // const arrayLatLon = markerPos.map((e) => {
  //   return {
  //     lat: +e.latitude,
  //     lng: +e.longitude,
  //   };
  // });

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
      clickableIcons: false,
    }),
    []
  );
  // console.log(arrayLatLon);
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
          {/* <MarkerClusterer>
            {(clusterer) => (
              <> */}
          {pos ? (
            <Marker position={pos} />
          ) : (
            markerPos.map((e: any, idx: number) => (
              <Marker
                key={idx}
                position={{ lat: e.lat, lng: e.lng }}
                onClick={() => showhideInfohandler(idx)}
                // clusterer={clusterer}
                // options={options}
                icon={"./park-icon.png"}
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
            ))
          )}
          {/* </>
            )}
          </MarkerClusterer> */}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

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

// {markerPos.map((e: any, idx: number) => (
//   <MarkerF
//     key={idx}
//     position={{ lat: +e.latitude, lng: +e.longitude }}
//     onClick={() => showhideInfohandler(idx)}
//     options={options}
//     icon={"./park-icon.png"} // public/park-icon.png
//   >
//     {selected.includes(idx) && (
//       <InfoWindowF
//         key={idx}
//         position={{ lat: +e.latitude, lng: +e.longitude }}
//         onCloseClick={() => showhideInfohandler(idx)}
//       >
//         <div className={styles.info}>{e.fullName}</div>
//       </InfoWindowF>
//     )}
//   </MarkerF>
// ))}
