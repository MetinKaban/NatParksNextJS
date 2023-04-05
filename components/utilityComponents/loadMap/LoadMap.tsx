import Map from "./map/Map";
import { useLoadScript } from "@react-google-maps/api";

const library: any = ["places"];

const LoadMap = ({ parks }: any) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbhc-B23y1r9Ic4ocp4FkLnQ2OnXevrc8",
    libraries: library,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map markerPos={parks} />;
};

export default LoadMap;
