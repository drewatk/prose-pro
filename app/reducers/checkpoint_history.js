import { UPDATE_HISTORY_STATE } from "app/actions/history";

const checkpointHistory = (state = [], { type, payload }) => {
  if (type === UPDATE_HISTORY_STATE) {
    return payload;
  }
  return state;
};

export default checkpointHistory;
