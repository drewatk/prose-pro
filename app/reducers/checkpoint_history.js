import { LOAD_FILE_HISTORY } from "app/actions/git_abs";

const checkpointHistory = (state = [], { type, payload }) => {
  if (type === LOAD_FILE_HISTORY) {
    console.log("got a history update! ", payload);
    return payload;
  }
  return state;
};

export default checkpointHistory;
