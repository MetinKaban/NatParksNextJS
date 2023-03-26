import { useEffect, useState } from "react";

export default function FetchParkFunc() {
  const [parks, setParks] = useState<any[]>([]);
  const [cond, setCond] = useState<number[]>([]);
  const [visited, setVisited] = useState<number[]>([]);
  const [userSearchedPark, setUserSearchedPark] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let fetchedData = [];

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&limit=200&q=%22national%20park%22&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda"
      );
      const data = await response.json();
      fetchedData = data.data;

      setParks(
        fetchedData
          .filter(
            (e: any) =>
              e.fullName.includes("National Park") ||
              e.fullName.includes("Redwood National and State Parks")
          )
          .filter((e: any) => !e.fullName.includes("Wolf"))
      );
      setIsLoading(false);
    };

    fetchItems();
  }, []);
  return parks;
}
