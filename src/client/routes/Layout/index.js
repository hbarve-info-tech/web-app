"use strict";
const IsClient = typeof document === "object";

import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Header from "../../components/Header";
import Drawer from "../../components/Drawer";
import Footer from "../../components/Footer";

if(IsClient) {
  require('./Layout.scss');
}

const Layout = ({user, children}) => {
  return (
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header/>
      <Drawer/>
      <main class="mdl-layout__content">
        <div class="page-content">
          {children}
        </div>

        {/*Add spacer to push Footer down when not enough content*/}
        <div class="mdl-layout-spacer"></div>
        <Footer/>
      </main>
    </div>
  );
};

export default Layout;

// const mapStateToProps = (state) => ({user: state.user});
//
// export default connect(mapStateToProps, /*mapDispatchToProps*/)(Layout);