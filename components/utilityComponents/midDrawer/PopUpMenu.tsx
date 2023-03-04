import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const PopUpMenu = () => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button variant="contained" {...bindTrigger(popupState)} sx={{width:'220px'}}>
            activities
          </Button>
          <Menu {...bindMenu(popupState)} >
            <MenuItem sx={{width:'220px'}} onClick={popupState.close}>Profile</MenuItem>
            <MenuItem sx={{width:'220px'}} onClick={popupState.close}>My account</MenuItem>
            <MenuItem sx={{width:'220px'}} onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
};

export default PopUpMenu;
