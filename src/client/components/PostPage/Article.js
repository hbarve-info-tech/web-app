
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import {
  Editor,
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

import {
  MayashEditor,
  createEditorState,
  convertToString,
} from '../../../lib/mayash-editor';

import HeaderRow from '../Header/HeaderRow';

import style from './style';

const EditButton = ({ edit, onEdit, onSave }) => {
  return (
    <button
      className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
      onClick={edit ? onSave : onEdit}
    >
      <i className="material-icons">{edit ? 'save' : 'edit'}</i>
    </button>
  );
};

class Article extends Component {
  constructor(props) {
    super(props);
    const { title, description, data } = props.post;

    this.state = {
      edit: false,
      title: EditorState.createWithContent(ContentState.createFromText(title)),
      description: EditorState.createWithContent(ContentState.createFromText(description || '')),
      data: createEditorState(data),
    };

    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onEdit = () => {
    const { edit } = this.state;
    this.setState({edit: !edit});
  };
  onSave = () => {
    const { id, token } = this.props.elements[0];
    const { edit, title: titleState, description: descriptionState, data: dataState } = this.state;
    const { postId, title: titleProp, description: descriptionProp, data: dataProp } = this.props.post;
    const body = {};

    const newTitle = convertToString(convertToRaw(titleState.getCurrentContent()));
    const newDescription = convertToString(convertToRaw(descriptionState.getCurrentContent()));

    if (newTitle !== titleProp) {
      body.title = newTitle;
    }
    if (newDescription.length && newDescription !== descriptionProp) {
      body.description = newDescription;
    }

    body.data = convertToRaw(dataState.getCurrentContent());

    fetch(`/api/elements/${id}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        if (json.statusCode === 200) {
          this.setState({ ...json });
        }
        else if (json.statusCode >= 400) {
          this.setState({ ...json });
        }
      });

    this.setState({edit: !edit});
  };

  render() {
    const { post } = this.props;
    const user = this.props.elements[0];
    const { edit } = this.state;

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <HeaderRow/>

          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Article</a>
            <a href="#scroll-tab-2" className="mdl-layout__tab">Comments</a>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
            <div className="page-content">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--2-offset-desktop mdl-cell--8-col-desktop">
                  <div
                    className="mdl-card mdl-shadow--4dp"
                    style={style.container}
                  >
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">
                        <Editor
                          editorState={this.state.title}
                          onChange={(title) => this.setState({title})}
                          readOnly={!edit}
                          placeholder={'Article Title'}
                        />
                      </h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                      <Editor
                        editorState={this.state.description}
                        onChange={(description) => this.setState({description})}
                        readOnly={!edit}
                        placeholder={'Short Description'}
                      />
                    </div>
                    <div className="mdl-card__supporting-text">
                      <MayashEditor
                        editorState={this.state.data}
                        onChange={(data) => this.setState({data})}
                        readOnly={!edit}
                        placeholder={'Article Goes here...'}
                      />
                    </div>
                    <div className="mdl-card__menu">
                      {post.authorId === user.id ? (<EditButton edit={edit} onEdit={this.onEdit} onSave={this.onSave} />) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">
              Coming Soon...
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Article;
