import React, { useState } from "react";
import { OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PopUpMenu from "./PopUpMenu";
import styles from "./MidDrawer.module.css";

type Props = {
  setUserSearchedPark: any;
  // visited: number[];
};

const MidDrawer = ({ setUserSearchedPark }: Props) => {
  const [selectPopup, setSelectPopup] = useState("");
  const searchedParkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchedPark(e.target.value);
  };

  const activities = {
    name: "activities",
    features: ["camping", "hiking", "kayaking", "biking"],
  };
  const amenities = {
    name: "amenities",
    features: ["restrooms", "camp site", "parking", "gift shop"],
  };
  // const amenities = ["restrooms", "camp site", "parking", "gift shop"];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <PopUpMenu items={activities} />
      </div>
      <div className={styles.left}>
        <PopUpMenu items={amenities} />
      </div>
      <div className={styles.intContainer}>
        <OutlinedInput
          placeholder="Type to search"
          sx={{ color: "white", width: "90%", borderRadius: "12px" }}
          onChange={searchedParkHandler}
        />
        <SearchIcon
          color="primary"
          fontSize="large"
          sx={{ paddingRight: "25px" }}
        />
      </div>
      <div className={styles.visitedNo}>
        {/* <h3 style={{ color: "white" }}>{`${visited.length} / 62`}</h3> */}
      </div>
    </div>
  );
};

export default MidDrawer;

// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

// const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// const open = Boolean(anchorEl);
// const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//   setAnchorEl(event.currentTarget);
// };
// const handleClose = () => {
//   setAnchorEl(null);
// };

{
  /* <Button onClick={handleClick}>Activities</Button>
      <Menu open={open} onClose={handleClose}>
        <MenuItem>act1</MenuItem>
        <MenuItem>act2</MenuItem>
        <MenuItem>act3</MenuItem>
      </Menu> */
}
{
  /* <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Dashboard
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Profile</MenuItem>
              <MenuItem onClick={popupState.close}>My account</MenuItem>
              <MenuItem onClick={popupState.close}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState> */
}
