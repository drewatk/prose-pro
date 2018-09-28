import { EditorState } from "draft-js";
import { UPDATE_EDITOR_STATE } from "../actions/editor";

const defaultState = {
  editorState: EditorState.createEmpty()
};

export default function editor(state = defaultState, { payload, type }) {
  if (type === UPDATE_EDITOR_STATE) {
    return {
      ...state,
      editorState: payload
    };
  }
  return state;
}
