
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

class ArticleName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleName: this.props.articleName,
      edit: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { id, token } = this.props.user;
    const { articleId } = this.props;
    const { articleName } = this.state;
    // console.log(this.props);
    this.props.updateArticle({ id, token, articleId, articleName });
    this.setState({ edit: false });
  }

  render() {
    const { articleName, edit } = this.state;
    const { author } = this.props;

    if (author === false) {
      return (<div>{articleName}</div>);
    }

    if (edit === false) {
      return (
        <div>
          {articleName}
          <button
            className="mdl-button mdl-js-button mdl-button--icon"
            onClick={() => this.setState({ edit: !edit })}
          >
            <i className="material-icons">edit</i>
          </button>
        </div>
      );
    }

    return (
      <div>
        <div
          className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
          style={{ width: '100vh' }}
        >
          <input
            className="mdl-textfield__input"
            type="text"
            value={articleName}
            onChange={e => this.setState({ articleName: e.target.value })}
            style={{ fontSize: '20px', width: '100vh' }}
          />
          <label className="mdl-textfield__label" htmlFor="sample4">Article Title</label>
          <span className="mdl-textfield__error">Input is not a number!</span>
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--icon"
          onClick={this.onSubmit}
        >
          <i className="material-icons">save</i>
        </button>
      </div>
    );
  }
}

ArticleName.propTypes = {
  author: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  articleId: PropTypes.number.isRequired,
  articleName: PropTypes.string.isRequired,
  updateArticle: PropTypes.func.isRequired,
};

export default ArticleName;
