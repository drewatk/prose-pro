import { FORM_SUBMIT_SUCCEEDED } from "app/actions/form";

/* Useful for clearing form data upon successful submitted. */
const clearFormOnSuccess = (state, action) => {
  switch (action.type) {
    case FORM_SUBMIT_SUCCEEDED:
      return undefined; // remove existing form state
    default:
      return state;
  }
};

export { clearFormOnSuccess };
