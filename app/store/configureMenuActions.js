import { convertToRaw } from "draft-js";
import { UPDATE_LAST_SAVED } from "app/actions/history";
import { ipcRenderer } from "electron";

function configureMenuActions(store) {
  ipcRenderer.on("save-file", () => {
    const { dispatch } = store;
    const {
      gitAbstractions,
      currentFile,
      editor: { editorState }
    } = store.getState();

    if (gitAbstractions && currentFile && editorState) {
      gitAbstractions
        .saveFile(currentFile, convertToRaw(editorState.getCurrentContent()))
        .then(() => gitAbstractions.getLatestTime(currentFile))
        .then(time => dispatch({ type: UPDATE_LAST_SAVED, payload: time }))
        .catch(err => {
          console.error("Saving (menu action)", err);
        });
    }
  });

  ipcRenderer.on("export-project", (_, filePath) => {
    //const { dispatch } = store;
    const { currentProject, files } = store.getState();
    console.log(currentProject, files, filePath);
    if (currentProject) {
      // iterate through each file and convert it's raw state to plain markdown.
      // save all files in a new directory within filePath
    }
  });
}

export default configureMenuActions;
