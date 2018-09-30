import { combineReducers } from "redux";
import editor from "app/reducers/editor";
import view from "app/reducers/view";
import history from "app/reducers/history";

const rootReducer = combineReducers({
  editor,
  history,
  view
});

export default rootReducer;
