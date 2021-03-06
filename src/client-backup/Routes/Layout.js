'use strict';
import React from "react";
import { Link } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";

const RouteLayout = ({children}) => {
  return (
    <div class="wrapper">
      <Header/>
      <div class="content-wrapper" style={{minHeight: '749px'}}>
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default RouteLayout;