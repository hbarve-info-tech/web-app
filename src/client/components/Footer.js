"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Grid, Row, Col, Button } from "react-bootstrap";

export default class Footer extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <footer class="main-footer">
        <Grid>
          <hr/>
          <Row>
            <div style={{textAlign: 'center'}}>
              All rights reserved © 2016
            </div>
          </Row>
        </Grid>
      </footer>
    );
  };
}
