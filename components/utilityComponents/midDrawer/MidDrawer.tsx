import React, { useState } from "react";
import { OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./MidDrawer.module.css";

type Props = {
  setUserSearchedPark: any;
}


const MidDrawer = ({
  setUserSearchedPark,
}: Props) => {

  const searchedParkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchedPark(e.target.value)
  };

  return (
    <div className={styles.container}>
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
