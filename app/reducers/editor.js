import { EditorState } from "draft-js";
import {
  UPDATE_EDITOR_STATE,
  SET_EDIT_STATE,
  SET_VIEW_STATE,
  SET_DIFF_STATE
} from "../actions/editor";

export const EDIT_MODE = "EDIT_MODE";
export const VIEW_MODE = "VIEW_MODE";
export const DIFF_MODE = "DIFF_MODE";

const defaultState = {
  editorState: EditorState.createEmpty(),
  editorMode: EDIT_MODE,
  viewedCheckpoint: null,
  diffData: null
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
        editorMode: EDIT_MODE,
        viewedCheckpoint: null,
        diffData: null
      };
    case SET_VIEW_STATE:
      return {
        ...state,
        editorMode: VIEW_MODE,
        viewedCheckpoint: payload,
        diffData: null
      };
    case SET_DIFF_STATE:
      return {
        ...state,
        editorMode: DIFF_MODE,
        diffData: payload,
        viewedCheckpoint: null
      };
  }

  return state;
}
