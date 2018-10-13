import { UPDATE_FILES } from "app/actions/files";

const files = (state = [], { type, payload }) => {
  if (type === UPDATE_FILES) {
    return payload;
  }
  return state;
};

export default files;
