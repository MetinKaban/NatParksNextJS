import { useState } from "react";
import { useRouter } from "next/router";
import ParkSuperDetails from "components/utilityComponents/parkSuperDetails/ParkSuperDetails";
import { Button, Modal } from "@mui/material";
import styles from "../../styles/Home.module.css";

const ParkDetails = ({ park, amenity, weather }: any) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<any>({
    isOpen: false,
    subject: "",
  });

  return (
    <div className={styles.parkDetailContainer}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={park.images[0].url}
          alt={park.images[0].altText}
        />
      </div>
      <h1 className={styles.parkName}>{park.fullName}</h1>
      <div className={styles.infoContainer}>
        <div className={styles.infoContainerLeft}>
          <div
            className={styles.box}
            onClick={() =>
              setShowModal({ isOpen: true, subject: "description" })
            }
          >
            description + directions
          </div>
          <div className={styles.box}>alerts</div>
          <div
            className={styles.box}
            onClick={() =>
              setShowModal({ isOpen: true, subject: "activities" })
            }
          >
            activities
          </div>
          <div
            className={styles.box}
            onClick={() => setShowModal({ isOpen: true, subject: "amenities" })}
          >
            amenities
          </div>
        </div>
        <div className={styles.infoContainerRight}>
          <div
            className={styles.weatherBox}
            // onClick={() => setIsDescribed(true)}
          >
            weatherInfo
          </div>
        </div>
      </div>
      {showModal.isOpen && (
        <Modal open={showModal.isOpen} aria-labelledby={park.code}>
          <ParkSuperDetails
            park={park}
            amenity={amenity}
            setShowModal={setShowModal}
            modalSubject={showModal.subject}
          />
        </Modal>
      )}

      <button onClick={() => router.back()} className={styles.btn}>
        <div className={styles.btnOpcty}>Go back</div>
      </button>
    </div>
  );
};

export default ParkDetails;

export async function getServerSideProps(context: any) {
  // const router = useRouter();
  const { code } = context.query;
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda`,
    {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        Accept: "application/json; charset=UTF-8",
      },
    }
  );
  const data = await res.json();
  const park = data.data[0];

  const getAmenities = await fetch(
    `https://developer.nps.gov/api/v1/amenities?q=%22${code}%22&api_key=0kakgJHyPaKYnKaMNfANT9skeGsL1VtoBhZUJJda`,
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

  const amenityData = await getAmenities.json();
  const amenity = amenityData.data.map((a: any) => a.name);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9a1ee9915fmsh2096a8812352942p1d4c10jsn0d2f4bd545c9",
      "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
    },
  };

  const lat = Math.round(park.latitude)
  const lon = Math.round(park.longitude)

  // const getWeather = await fetch(
  //   `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${lat}${lon}&contentType=csv&unitGroup=us&shortColumnNames=0`,
  //   options
  // );
  
  // const weatherData = await getWeather.json();
  // const weather = weatherData;


    // console.log(weather)

  return {
    props: {
      park: park,
      amenity: amenity,
      // weather: weather
    },
  };
}

{
  /* <Modal
open={cond.includes(idx)}
aria-labelledby={idx.toString()}
>
<ParkDescription
  e={e}
  descriptionHandler={descriptionHandler}
  idx={idx}
/>
</Modal> */
}
