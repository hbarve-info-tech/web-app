
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor, EditorState } from 'draft-js';

import actions from '../../actions';

import style from './style';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: EditorState.createEmpty(),
      description: EditorState.createEmpty(),
      data: EditorState.createEmpty(),
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, data } = this.state;



  };

  render() {
    const { title } = this.state;

    return (
      <div className="mdl-card mdl-shadow--4dp" style={style}>
        <div className="mdl-card__supporting-text">
          <Editor
            editorState={title}
            onChange={(title) => this.setState({title})}
            placeholder="Post title goes here..."
          />
        </div>
        <div className="mdl-card__actions mdl-card--border" style={{textAlign: 'right'}}>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored">
            Create
          </button>
        </div>
      </div>
    );
  };
}

Create.propTypes = {
  type: PropTypes.oneOf([
    'post',
    'course'
  ]).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    classroom: PropTypes.bool,
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
  }),
  courses: PropTypes.object,
  articles: PropTypes.object,
  createArticle: PropTypes.func,
  createCourse: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
  articles: state.articles,
  courses: state.courses,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  createArticle: actions.createArticle,
  createCourse: actions.createCourse,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Create);
