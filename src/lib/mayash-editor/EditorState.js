import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';

import {
  hashtagStrategy,
  HashtagSpan,

  handleStrategy,
  HandleSpan,
} from './components/Decorators';

const defaultDecorators = new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: HandleSpan,
  },
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
]);


export const createEditorState = (content = null, decorators = defaultDecorators) => {
  if (content === null) {
    return EditorState.createEmpty(decorators);
  }
  return EditorState.createWithContent(convertFromRaw(content), decorators);
};


export default createEditorState;
