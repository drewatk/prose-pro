import { TOGGLE_THEME } from "../actions/theme.js";

import styles from "../index.scss";

const initialState = styles.lightTheme;

export default function theme(state = initialState, { type }) {
  switch (type) {
    case TOGGLE_THEME:
      return state === styles.lightTheme ? styles.darkTheme : styles.lightTheme;
  }
  return state;
}
