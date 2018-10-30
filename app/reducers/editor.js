import { EditorState } from "draft-js";
import { UPDATE_EDITOR_STATE, TOGGLE_EDIT_STATE } from "../actions/editor";

const defaultState = {
  editorState: EditorState.createEmpty(),
  isEditable: true
};

export default function editor(state = defaultState, { payload, type }) {
  switch (type) {
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: payload
      };
    case TOGGLE_EDIT_STATE:
      return {
        ...state,
        isEditable: !state.isEditable
      };
  }

  return state;
}
