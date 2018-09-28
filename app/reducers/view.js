import { TOGGLE_SHOW_HISTORY, TOGGLE_SHOW_FILE_LIST } from "../actions/view";

const initialState = {
  showHistory: true,
  showFileList: true
};

export default function editor(state = initialState, { type }) {
  switch (type) {
    case TOGGLE_SHOW_HISTORY:
      return Object.assign({}, state, {
        showHistory: !state.showHistory
      });

    case TOGGLE_SHOW_FILE_LIST:
      return Object.assign({}, state, {
        showFileList: !state.showFileList
      });
  }
  return state;
}
