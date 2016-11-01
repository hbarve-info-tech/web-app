"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from "react-bootstrap";

import actions    from '../actions';

import Layout from "./Layout";

import ProfileInfo from "../components/ProfileInfo";
import PostCreate  from "../components/PostCreate";
import Timeline    from "../components/Timeline";


class ViewElement extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };

  configure(username) {
    let elements = this.props.elements;
    if(this.props.user.username === username) {
      this.setState({element: this.props.user});
    }
    else {
      elements.array.map((element, index) => {
        if(element.username === username) {
          this.setState({element});
        }
      });
    }
  }
  componentWillMount () {
    console.log('hi there.')
    let username = this.props.params.username;
    this.configure(username);
  }
  componentWillReceiveProps (nextProps) {
    let username = nextProps.params.username;
    this.configure(username);
  }

  render () {
    let { user } = this.props;
    let { element } = this.state;

    return (
      <Layout>
        <section class="content">
          <Row>
            <Col xs={12} sm={3} md={3} lg={3}>
              <ProfileInfo {...element}/>
            </Col>
            <Col xs={12} sm={9} md={9} lg={9}>
              {element && user.id == element.id ? <PostCreate {...user}/> : null}
              <Timeline   {...this.props}/>
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
)(ViewElement);
