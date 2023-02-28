import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SmallMap from "../smallMap/SmallMap";
import styles from "./ParkDescription.module.css";

type Props = {
  e: any;
  descriptionHandler: (idx: number) => void;
  idx: number;
};

const ParkDescription = ({ e, descriptionHandler, idx }: Props) => {
  return (
    <div className={styles.container}>
      <div>
        <h4 style={{ fontSize: "18px", color: "white" }}>
          {e.fullName}, {e.states}
        </h4>
        <p className={styles.descriptionP}>{e.description}</p>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.img}>
          <Carousel
            showThumbs={false}
            showArrows={true}
            showStatus={true}
            width={"550px"}
          >
            {e.images.map((image: any, imgIdx: number) => (
              <img
                style={{
                  objectFit: "contain",
                  width: "550px",
                  height: "400px",
                }}
                key={imgIdx}
                src={image.url}
                alt={image.altText}
              />
            ))}
          </Carousel>
        </div>
        <div className={styles.map}>
          <SmallMap e={e} />
        </div>
      </div>
      <Link href={{ pathname: `/famous/${e.fullName}`, query: { code: e.parkCode } }}>
        <Button
          variant="contained"
          // onClick={() => descriptionHandler(idx)}

          sx={{ backgroundColor: "black", color: "white", width: "100%" }}
        >
          Go to park details
        </Button>
      </Link>
      <Divider />
      <Button
        variant="contained"
        onClick={() => descriptionHandler(idx)}
        sx={{ backgroundColor: "black", color: "white" }}
      >
        Close
      </Button>
    </div>
  );
};

export default ParkDescription;
