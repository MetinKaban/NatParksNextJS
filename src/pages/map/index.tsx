import LoadMap from "components/utilityComponents/loadMap/LoadMap";
import { useState } from "react";

const MapPage = ({ parks }: any) => {
  return (
    <div style={{ marginTop: "40px", width: "100%" }}>
      <LoadMap />
    </div>
  );
};

// export async function getServerSideProps() {
//   let tempPark = [];
//   // const [parks, setParks] = useState([]);
//   const response = await fetch(
//     "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&limit=500&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda",
//     {
//       method: "GET",
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
//         Accept: "application/json; charset=UTF-8",
//       },
//     }
//   );

//   const data = await response.json();
//   const parks = data.data
//     .filter(
//       (e: any) =>
//         e.fullName.includes("National Park") ||
//         e.fullName.includes("Redwood National and State Parks")
//     )
//     .filter((e: any) => !e.fullName.includes("Wolf"));

//   // setParks(tempPark);

//   return {
//     props: {
//       parks,
//     },
//   };
// }

export default MapPage;
