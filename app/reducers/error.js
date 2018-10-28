import { SHOW_ERROR, HIDE_ERROR } from "app/actions/error";

const error = (state = {}, { type, payload }) => {
  switch (type) {
    case SHOW_ERROR:
      return {
        hasError: true,
        errorMessage: payload.errorMessage
      };
    case HIDE_ERROR:
      return { hasError: false, errorMessage: null };
    default:
      return state;
  }
};

export default error;
