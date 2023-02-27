import { useState } from "react";
import { Button, Rating } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import styles from "../FetchData.module.css";

type Props = {
  idx: number;
  e: any;
  descriptionHandler: (idx: number) => void;
  cond: number[];
  visited: number[];
  setVisited: React.Dispatch<React.SetStateAction<number[]>>;
};

const ParkCarts = ({
  idx,
  e,
  descriptionHandler,
  cond,
  visited,
  setVisited,
}: Props) => {
  const visitHandler = (idx: number) => {
    if (visited.includes(idx)) {
      setVisited((prev: number[]) =>
        prev.filter((e) => visited.indexOf(e) !== visited.indexOf(idx))
      );
    } else {
      setVisited((prev) => [...prev, idx]);
    }
  };

  return (
    <div
      className={
        visited.includes(idx)
          ? styles.liVisited
          : cond.includes(idx)
          ? styles.liCond
          : styles.li
      }
    >
      <div onClick={() => descriptionHandler(idx)}>
        <div className={styles.imgtextContainer}>
          <img
            src={e.images[0].url}
            alt={e.images[0].altText}
            style={{ objectFit: "fill" }}
            className={styles.smallimg}
          />
          <p className={styles.cartText}>
            {e.fullName}, {e.states}
          </p>
        </div>
      </div>
      {!visited.includes(idx) ? (
        <Button
          variant="contained"
          onClick={() => visitHandler(idx)}
          sx={{
            height: "40px",
            width: "100%",
            opacity: "0.8",
            backgroundColor: "rgb(154, 70, 70)",
            borderRadius:'12px'
          }}
        >
          <p>I've Been There!</p>
        </Button>
      ) : (
        <DoneIcon
          fontSize="medium"
          key={idx}
          sx={{ color: "green", height: "40px", width: "100%",borderRadius:'16px' }}
          onClick={() => visitHandler(idx)}
        />
      )}
      {visited.includes(idx) && (
        <Rating
          defaultValue={5}
          precision={0.5}
          sx={{
            color: "rgb(154, 70, 70)",
            border: "gray 1px solid",
            marginTop: "4px",
          }}
        />
      )}
    </div>
  );
};

export default ParkCarts;
