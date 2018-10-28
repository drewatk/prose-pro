export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export const showError = errorMessage => ({
  type: SHOW_ERROR,
  payload: { errorMessage }
});

export const hideError = () => ({ type: HIDE_ERROR });
