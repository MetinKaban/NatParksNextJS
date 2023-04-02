import Map from "./map/Map";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const library: any = ["places"];
const fetchOptions = {
  method: "GET",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    Accept: "application/json; charset=UTF-8",
  },
};

const LoadMap = () => {
  const [parkData, setParkData] = useState([]);
  useEffect(() => {
    const fetchParks = async () => {
      const response = await fetch(
        "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&limit=500&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda",
        fetchOptions
      );
      const data = await response.json();
      const parks = data.data;
      setParkData(parks.map((e:any) => {
        return {
          lat: +e.latitude,
          lng: +e.longitude,
        };
      }));
    };
    fetchParks();
  }, []);
  
  console.log(parkData)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbhc-B23y1r9Ic4ocp4FkLnQ2OnXevrc8",
    libraries: library,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map markerPos={parkData}/>;
};

export default LoadMap;
