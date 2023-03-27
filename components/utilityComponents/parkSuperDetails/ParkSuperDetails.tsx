import styles from "./parkSuperDetails.module.css";

type Props = {
  park: any;
  setShowModal: any;
  modalSubject: string;
  amenity: string[];
};

const ParkSuperDetails = ({
  park,
  amenity,
  setShowModal,
  modalSubject,
}: Props) => {
  let content = <div></div>;

  if (modalSubject === "description") {
    content = (
      <div>
        <div>{park.description}</div>
        <div>{park.directionsInfo}</div>
      </div>
    );
  }
  if (modalSubject === "activities") {
    content = (
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {park.activities.map((act: any, idx: number) => (
          <li key={idx}>{act.name}</li>
        ))}
      </ul>
    );
  }

  let code = park.parkCode;

  if (modalSubject === "amenities") {
    content = (
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {amenity.map((a, idx) => (
          <li key={idx}>{a}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.smallContainer}
        onClick={() => setShowModal({ isOpen: false, subject: "" })}
      >
        {content}
      </div>
      {/* <button
        onClick={() => {
          descriptionHandler();
          console.log(isDescribed);
        }}
      >
        close
      </button> */}
    </div>
  );
};

export default ParkSuperDetails;
