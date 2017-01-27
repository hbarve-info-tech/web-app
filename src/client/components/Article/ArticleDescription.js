
import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import Component from 'react/lib/ReactComponent';

class ArticleDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.articleDescription,
      edit: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { id, token } = this.props.user;
    const { articleId } = this.props;
    const { description } = this.state;
    this.props.updateArticle({ id, token, articleId, description });
    this.setState({ edit: false });
  }

  render() {
    const { description, edit } = this.state;
    const { author } = this.props;

    if (author === false) {
      return (<div>{description}</div>);
    }

    if (edit === false) {
      return (
        <div>
          {description}
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
          <textarea
            className="mdl-textfield__input"
            value={description}
            type="text"
            rows={3}
            onChange={e => this.setState({ description: e.target.value })}
            style={{ width: '100vh' }}
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

ArticleDescription.propTypes = {
  author: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  articleId: PropTypes.number.isRequired,
  articleDescription: PropTypes.string.isRequired,
  updateArticle: PropTypes.func.isRequired,
};

export default ArticleDescription;
