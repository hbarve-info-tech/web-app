"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from "react-bootstrap";

import actions    from '../actions';


class Element extends Component {
  constructor (props) {
    super(props);
  };

  componentWillMount () {

  }
  componentWillReceiveProps (nextProps) {}

  render () {
    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            This is going to be Element.
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>

          </Col>
        </Row>
      </section>
    );
  };
}


function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    actions,
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element);