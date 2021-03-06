
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import Article from './Article';
import Error from '../Error';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { articleId } = this.props.routeParams;
    const article = this.props.articles.array.find(a => a.articleId === parseInt(articleId, 10));

    return (
      <div className="mdl-grid mdl-shadow--4dp mayash-article-view-page">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
          {article.statusCode === 200 ? (
            <Article
              article={article}
              user={this.props.user}
              updateArticle={this.props.updateArticle}
            />
            ) : (<Error {...article} />)}
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-cell--2-col-tablet mdl-cell--4-col-phone" />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string,
    profilePic: PropTypes.string,
    isSigningIn: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    lastUpdated: PropTypes.number,
  }).isRequired,
  articles: PropTypes.shape({
    array: PropTypes.arrayOf(PropTypes.object),
    isCreating: PropTypes.bool,
    isUpdating: PropTypes.bool,
    isFetching: PropTypes.bool,
    isDeleting: PropTypes.bool,
    isCreated: PropTypes.bool,
    isUpdated: PropTypes.bool,
    isFetched: PropTypes.bool,
    isDeleted: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    lastUpdated: PropTypes.number,
  }).isRequired,
  routeParams: PropTypes.shape({
    articleId: PropTypes.string.isRequired,
  }).isRequired,
  updateArticle: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
