import Header from "components/layout/header/Header";
import React from "react";

const Layout = (props: any) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
