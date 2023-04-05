import FetchAllParks from "components/fetchAllParks/FetchAllParks";
import React from "react";

type Props = {
  parks: any;
  isLoading: boolean;
};

export default function Home({ parks, isLoading }: Props) {
  return <FetchAllParks parks={parks} isLoading={isLoading} />;
}
