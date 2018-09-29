import { combineReducers } from "redux";
import editor from "app/reducers/editor";
import view from "app/reducers/view";

const rootReducer = combineReducers({
  editor,
  view
});

export default rootReducer;
