import { UPDATE_FILE_HISTORY } from "app/actions/git_abs";
const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });

const defaultHistory = [
  { message: "first commit", date: now },
  { message: "second commit", date: now },
  { message: "day 68. still doesn't work. i'm giving up", date: now }
];

const checkpointHistory = (state = defaultHistory, { type, payload }) => {
  if (type === UPDATE_FILE_HISTORY) {
    return payload;
  }
  return state;
};

export default checkpointHistory;
