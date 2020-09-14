import React from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/index";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  return (
    <>
      <Header />
        {props.children}
    </>
  );
};

export default Layout;
