import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const PopUpMenu = ({ items }: any) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{ width: "220px" }}
          >
            {items.name}
          </Button>
          <Menu {...bindMenu(popupState)}>
            {items.features.map((e: string, idx: number) => (
              <MenuItem
                key={idx}
                sx={{ width: "220px", backgroundColor: "darkgray" }}
                onClick={popupState.close}
              >
                {e}
              </MenuItem>
            ))}
            {/* <MenuItem sx={{width:'220px'}} onClick={popupState.close}>Profile</MenuItem>
            <MenuItem sx={{width:'220px'}} onClick={popupState.close}>My account</MenuItem>
            <MenuItem sx={{width:'220px'}} onClick={popupState.close}>Logout</MenuItem> */}
          </Menu>
        </>
      )}
    </PopupState>
  );
};

export default PopUpMenu;
