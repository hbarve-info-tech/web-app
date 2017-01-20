
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Footer from '../../components/Footer';

import actions from '../../actions';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./Layout.scss');
}

const Layout = ({ children }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Header />
    <Drawer />
    <main className="mdl-layout__content">
      <div className="page-content">
        {children}
      </div>

      {/* Add spacer to push Footer down when not enough content*/}
      <div className="mdl-layout-spacer" />
      <Footer />
    </main>
  </div>
);


const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
