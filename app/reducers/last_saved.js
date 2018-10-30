import { UPDATE_LAST_SAVED } from "app/actions/history";

const lastSaved = (state = null, { type, payload }) => {
  if (type === UPDATE_LAST_SAVED) {
    return payload;
  }
  return state;
};

export default lastSaved;
