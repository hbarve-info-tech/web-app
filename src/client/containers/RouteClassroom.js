"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from "react-bootstrap";

import actions    from '../actions';

import ProfileInfo from "../components/ProfileInfo";
import PostCreate  from "../components/PostCreate";
import Timeline    from "../components/Timeline";

class RouteClassroom extends Component {
  constructor (props) {
    super(props);
  };
  count = 0;

  configureClassroom({elements, routeParams}) {
    elements     = elements.array;
    let { username } = routeParams;

    let element = _.find(elements, (e) => e.username == username);
    this.setState({element});

    if(element && !this.count) {
      this.props.fetchCourses(element.id);
      this.count = ++this.count;
    }
  }
  componentWillMount () {
    this.configureClassroom(this.props);
  }
  componentWillReceiveProps (nextProps) {
    this.configureClassroom(nextProps);
  }

  render () {
    let { element } = this.state;
    let { user } = this.props;
    let posts = [];
    if(element) {
      posts = _.filter(this.props.courses.array, (e) => e.authorId == element.id);
    }

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            {element ?
              <ProfileInfo
                {...element}
              /> : null}
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>
            {element && user.id == element.id ? (
              <PostCreate
                placeholder ="New Course Name..."
                user        ={this.props.user}
                createCourse={this.props.createCourse}
              />
            ) : null}
            <Timeline
              timelineType="courses"
              posts={posts}
            />
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
)(RouteClassroom);
