
// This function will take raw state of draft-js editor and convert it to string.
export const convertToString = state => state.blocks.map(block => block.text).join(' ').trim();

export default {
  convertToString,
};
