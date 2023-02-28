import { useState } from "react";
import { useRouter } from "next/router";
import ParkSuperDetails from "components/utilityComponents/parkSuperDetails/ParkSuperDetails";
import { Button, Modal } from "@mui/material";
import styles from "../../styles/Home.module.css";

const ParkDetails = ({ park }: any) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<any>({
    isOpen: false,
    subject: "",
  });

  const keywords = ["description"];

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
          <div className={styles.box}>activities</div>
          <div className={styles.box}>amenities</div>
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

  return {
    props: {
      park: park,
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
