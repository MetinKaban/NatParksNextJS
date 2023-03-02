import { useEffect, useState } from "react";
import VideoScreen from "../utilityComponents/videoScreen/VideoScreen";
import MidDrawer from "../utilityComponents/midDrawer/MidDrawer";
import ParkCarts from "../utilityComponents/parkCarts/ParkCarts";
import ParkDescription from "../utilityComponents/fetchedDescription/ParkDescription";
import styles from "./FetchData.module.css";
import Modal from "@mui/material/Modal";
import HourglassBottomSharpIcon from "@mui/icons-material/HourglassBottomSharp";

const Fetch62ParkData = () => {
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

  // const parkNames = parks.map((park) => park.fullName);

  const descriptionHandler = (idx: number) => {
    if (visited.includes(idx)) return;
    if (cond.includes(idx)) {
      setCond((prev) =>
        prev.filter((e) => cond.indexOf(e) !== cond.indexOf(idx))
      );
    } else {
      setCond([idx]);
    }
  };

  return (
    <>
      <VideoScreen />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <HourglassBottomSharpIcon sx={{ fontSize: "30px", color: "white" }} />
        </div>
      ) : (
        <>
          <MidDrawer setUserSearchedPark={setUserSearchedPark} visited={visited}/>
          <div className={styles.container}>
            <ul className={styles.ul}>
              <div className={styles.itemsContainer}>
                {parks
                  .filter((p) =>
                    p.name
                      .toLowerCase()
                      .includes(userSearchedPark.toLowerCase())
                  )
                  .map((e: any, idx) => (
                    <li key={idx}>
                      <ParkCarts
                        e={e}
                        idx={idx}
                        descriptionHandler={descriptionHandler}
                        cond={cond}
                        visited={visited}
                        setVisited={setVisited}
                      />
                      {cond.includes(idx) && !visited.includes(idx) && (
                        <Modal
                          open={cond.includes(idx)}
                          aria-labelledby={idx.toString()}
                        >
                          <ParkDescription
                            e={e}
                            descriptionHandler={descriptionHandler}
                            idx={idx}
                          />
                        </Modal>
                      )}
                    </li>
                  ))}
              </div>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Fetch62ParkData;
