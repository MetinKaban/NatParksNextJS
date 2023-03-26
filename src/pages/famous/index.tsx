import Fetch62ParkData from "components/fetch62ParkData/Fetch62ParkData";

type Props = {
  parks: any;
  isLoading: boolean
}

export default function Famous({parks, isLoading}: Props) {
  return <Fetch62ParkData parks={parks} isLoading={isLoading}/>;
}
