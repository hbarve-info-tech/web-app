import React from 'react';
import style from '../style';

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

export function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

export const HandleSpan = (props) => {
  return <span style={style.handle}>{props.children}</span>;
};

export const HashtagSpan = (props) => {
  return <span style={style.hashtag}>{props.children}</span>;
};


export default {
  handleStrategy,
  HandleSpan,

  hashtagStrategy,
  HashtagSpan,
};
