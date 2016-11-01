"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from "react-bootstrap";

import Layout    from './Layout';
import actions    from '../actions';


class Classroom extends Component {
  constructor (props) {
    super(props);
  };

  componentWillMount () {}
  componentWillReceiveProps (nextProps) {}

  render () {
    return (
      <Layout>
        <section class="content">
          <Row>
            <Col xs={12} sm={3} md={3} lg={3}>
              tjis is classroom.
            </Col>
            <Col xs={12} sm={9} md={9} lg={9}>

            </Col>
          </Row>
        </section>
      </Layout>
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
)(Classroom);