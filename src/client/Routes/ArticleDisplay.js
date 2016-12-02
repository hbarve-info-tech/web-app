"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import 'medium-draft/lib/index.css';
import {
  createEditorState,
  Editor,
} from 'medium-draft';

import { Row, Col } from "react-bootstrap";

import actions from '../actions';

class RouteArticleDisplay extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editorState  : createEditorState(),
      editorEnabled: false,
      placeholder  : 'This article is empty...',
    };
    this.onChange = (editorState) => this.setState({editorState});
  };

  configureState = ({articles, routeParams}) => {
    let { articleId } = routeParams;
    let article = articles.array.find(article => article.articleId == articleId);

    this.setState({
      article,
      editorState: (Object.keys(article.articleData).length != 0 ? createEditorState(article.articleData) : createEditorState())
    });
  };
  componentWillMount () {
    this.configureState(this.props);
  }
  componentWillReceiveProps (nextProps) {
    this.configureState(nextProps);
  }

  render () {
    let { article, editorState, editorEnabled } = this.state;

    return (
      <section class="content">
        <Row>
          <Col xs={12} sm={9} md={9} lg={9}>
            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">{article.articleName}</h3>
              </div>
              <div class="box-body no-padding">
                {article.description ?
                  (
                    <div class="mailbox-read-info">
                      <small>
                        {article.description}
                        {/*<span class="mailbox-read-time pull-right">15 Feb. 2016 11:03 PM</span>*/}
                      </small>
                    </div>
                  ) : null
                }

                <div class="mailbox-read-message">
                  <Editor
                    editorState  ={editorState}
                    editorEnabled={editorEnabled}
                    onChange     ={this.onChange}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={3} md={3} lg={3}>

          </Col>
        </Row>
      </section>
    );
  };
}

const mapStateToProps    = (state)    => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteArticleDisplay);
