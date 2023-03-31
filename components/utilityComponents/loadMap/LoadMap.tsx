import Map from "./map/Map";
import { useLoadScript } from "@react-google-maps/api";

type MarkerType = {
  markerPos: any[];
};

const library: any = ["places"];

const LoadMap = ({ markerPos }: MarkerType) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbhc-B23y1r9Ic4ocp4FkLnQ2OnXevrc8",
    libraries: library,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map markerPos={markerPos} />;
};

export default LoadMap;
