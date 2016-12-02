"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';


import { Row, Col } from "react-bootstrap";

import actions    from '../actions';

import ProfileInfo from "../components/ProfileInfo";
import PostCreate  from "../components/PostCreate";
import Timeline    from "../components/Timeline";

class RouteHome extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    if(!this.props.user.isFetched) {
      this.props.fetchUser();
    }
    if(!this.props.articles.isFetched) {
      this.props.fetchArticles(this.props.user.id);
    }
  }
  componentWillReceiveProps(nextProps) {}

  render() {
    let { user } = this.props;
    let posts = _.filter(this.props.articles.array, (e) => e.authorId == user.id);

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            <ProfileInfo
              {...user}
            />
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>
            <PostCreate
              placeholder  ="Create New Article..."
              createArticle={this.props.createArticle}
            />
            <Timeline
              posts       ={posts}
              timelineType="articles"
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
)(RouteHome);
