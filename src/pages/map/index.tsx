import LoadMap from "components/utilityComponents/loadMap/LoadMap";

const MapPage = ({ parks }: any) => {
  return (
    <div style={{ marginTop: "40px", width: "100%" }}>
      <LoadMap markerPos={parks} />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch(
    "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&limit=400&q=%22national%20park%22&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda",
    {
      method: "GET",
      headers: {
        // update with your user-agent
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        Accept: "application/json; charset=UTF-8",
      },
    }
  );

  const data = await response.json();
  const parks = data.data
    .filter(
      (e: any) =>
        e.fullName.includes("National Park") ||
        e.fullName.includes("Redwood National and State Parks")
    )
    .filter((e: any) => !e.fullName.includes("Wolf"));

  return {
    props: {
      parks,
    },
  };
}

export default MapPage;
