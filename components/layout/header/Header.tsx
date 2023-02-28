import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { Drawer } from "@mui/material";

const Header = () => {
  const [drawerState, setDrawerState] = useState<boolean>(false);

  const drawerHandler = () => {
    setDrawerState((prev) => !prev);
  };

  return (
    <header className={styles.container}>
      <div className={styles.left}>
        {/* <Link href="/"> */}
          <h1>National Parks</h1>
        {/* </Link> */}
      </div>
      <div className={styles.right}>
        <Link href="/" className={styles.link}>
          <div className={styles.eachSection}>
            <h5>All Parks</h5>
          </div>
        </Link>
        <Link href="/famous" className={styles.link}>
          <div className={styles.eachSection}>
            <h5>62 National Parks</h5>
          </div>
        </Link>
        <Link href="/search" className={styles.link}>
          <div className={styles.eachSection}>
            <h5>Search a Park by Name</h5>
          </div>
        </Link>
        <Link href="/map" className={styles.link}>
          <div className={styles.eachSection}>
            <h5>Parks Map</h5>
          </div>
        </Link>
        <div className={styles.eachSection} onClick={drawerHandler}>
          <h5>=</h5>
          <Drawer anchor="right" open={drawerState}>
            drawer
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
