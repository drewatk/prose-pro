import { EditorState } from "draft-js";
import {
  UPDATE_EDITOR_STATE,
  SET_EDIT_STATE,
  SET_VIEW_STATE
} from "../actions/editor";

const defaultState = {
  editorState: EditorState.createEmpty(),
  viewedCheckpoint: null,
  isEditable: true
};

export default function editor(state = defaultState, { payload, type }) {
  switch (type) {
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: payload
      };
    case SET_EDIT_STATE:
      return {
        ...state,
        isEditable: true,
        viewedCheckpoint: null
      };
    case SET_VIEW_STATE:
      return {
        ...state,
        isEditable: false,
        viewedCheckpoint: payload
      };
  }

  return state;
}
