"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from "react-bootstrap";

import actions    from '../actions';

import ProfileInfo from "../components/ProfileInfo";
import Timeline    from "../components/Timeline";

class RouteElement extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };
  count = 0;

  configureElement({elements, routeParams}) {
    elements     = elements.array;
    let { username } = routeParams;

    let element = _.find(elements, (e) => e.username == username);
    this.setState({element});

    if(element && !this.count) {
      this.props.fetchArticles(element.id);
      this.count = ++this.count;
    }

  }
  componentWillMount () {
    this.configureElement(this.props);
  }
  componentWillReceiveProps (nextProps) {
    this.configureElement(nextProps);
  }

  render () {
    let { element } = this.state;
    let posts = [];
    if(element) {
      posts = _.filter(this.props.articles.array, (e) => e.authorId == element.id);
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
            {element ?
              <Timeline
                timelineType="articles"
                posts  ={posts}
              /> : null}
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
)(RouteElement);
