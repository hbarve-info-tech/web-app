"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  convertToRaw, CompositeDecorator,
  ContentState, Editor,
  EditorState, Entity,
  RichUtils, getDefaultKeyBinding,
  KeyBindingUtil } from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;

import { Row, Col } from "react-bootstrap";

import actions from '../actions';

import ArticleDisplay from '../components/ArticleDisplay';


class Article extends Component {
  constructor (props) {
    super(props);
  };

  configureState = (articleId) => {
    let articles = this.props.articles;

    articles.array.map((article, index) => {
      if(article.articleId == articleId) {
        this.setState({article});
      }
    });
  };

  componentWillMount () {
    let articleId = this.props.routeParams.articleId;
    this.configureState(articleId);
  }

  componentWillReceiveProps (nextProps) {
    this.configureState(nextProps.routeParams.articleId);
  }

  render () {
    let articleId = this.props.routeParams.articleId;
    let article = {};

    this.props.articles.array.map((value, index) => {
      if(value.articleId == articleId) {
        article = value;
      }
    });

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={9} md={9} lg={9}>
            <ArticleDisplay
              user          ={this.props.user}
              article       ={article}
              updateArticle ={this.props.updateArticle}
            />
          </Col>
          <Col xs={12} sm={3} md={3} lg={3}>

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
)(Article);
