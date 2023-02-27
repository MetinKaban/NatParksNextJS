import { TextField, Button } from "@mui/material";

import styles from './FetchByName.module.css'
import React from "react";

const FetchByName = () => {

  const inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }


  return (
    <div className={styles.container}>
      {/* <div> */}
        {/* <input type="text" onChange={inputHandler}/> */}
        
        {/* <div style={{marginTop:'100px'}}>Hello world</div> */}
        <TextField variant="outlined" type="search" color="primary" onChange={inputHandler} sx={{backgroundColor:"white", opacity:"0.35"}}/>
        <Button variant="contained" size="large">Search</Button>
      {/* </div> */}
    </div>
  );
};

export default FetchByName;
