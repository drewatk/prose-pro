import { LOAD_FILE_HISTORY } from "app/actions/git_abs";

const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });

const defaultHistory = [
  { message: "first commit", date: now },
  { message: "second commit", date: now },
  { message: "third commit", date: now }
];

const checkpointHistory = (state = defaultHistory, { type, payload }) => {
  if (type === LOAD_FILE_HISTORY) {
    console.log("got a history update! ", payload);
    return payload;
  }
  return state;
};

export default checkpointHistory;
