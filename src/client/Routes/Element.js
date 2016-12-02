"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col } from "react-bootstrap";

import actions    from '../actions';

import ProfileInfo from "../components/ProfileInfo";
import Timeline    from "../components/Timeline";

class Element extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };
  count = 0;

  configureElement({elements, routeParams}) {
    let { username } = routeParams;
    let element      = elements.array.find((element) => element.username == username);
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
    let posts = this.props.articles.array.filter((article) => article.authorId == element.id);

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            <ProfileInfo
              {...element}
            />
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>
            <Timeline
              timelineType="articles"
              posts  ={posts}
            />
          </Col>
        </Row>
      </section>
    );
  };
}

const mapStateToProps    = (state)    => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Element);
