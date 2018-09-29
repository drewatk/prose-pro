export const TOGGLE_SHOW_HISTORY = "TOGGLE_SHOW_HISTORY";
export const TOGGLE_SHOW_FILE_LIST = "TOGGLE_SHOW_FILE_LIST";

export function toggleShowHistory() {
  return { type: TOGGLE_SHOW_HISTORY };
}

export function toggleShowFileList() {
  return { type: TOGGLE_SHOW_FILE_LIST };
}
