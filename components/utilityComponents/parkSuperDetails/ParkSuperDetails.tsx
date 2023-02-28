import styles from "./parkSuperDetails.module.css";

type Props = {
  park: any;
  setShowModal: any;
  modalSubject: string
};

const ParkSuperDetails = ({ park, setShowModal, modalSubject }: Props) => {

  let content = "";

  if(modalSubject === "description") {
    
  }



  return (
    <div className={styles.container}>
      <div
        className={styles.smallContainer}
        onClick={() => setShowModal({isOpen:false, subject: ""})}
      >
        {park.description}
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
