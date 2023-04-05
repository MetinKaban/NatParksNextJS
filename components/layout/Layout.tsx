import Header from "components/layout/header/Header";
import React from "react";

// type Props = {
//   props: any;
//   isLoggedIn: boolean
// }

const Layout = (props: any) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
