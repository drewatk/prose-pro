import { convertFromRaw, convertToRaw } from "draft-js";
import { UPDATE_LAST_SAVED } from "app/actions/history";
import { ipcRenderer } from "electron";
import { stateToMarkdown } from "draft-js-export-markdown";

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
    const { currentProject, files, gitAbstractions } = store.getState();
    console.log(currentProject, files, filePath);
    if (currentProject) {
      // MAY PROVIDE THIS THING ACCESS TO gitAbstractions FOR EASY FILE PATH INFO.
      // TODO: MAKE directory fs.ensureDir(filePath + projectName)

      // convert all file's data to raw markdown
      Promise.all(
        files.map(
          file =>
            new Promise((resolve, reject) => {
              gitAbstractions
                .openFile(file)
                .then(fileData => stateToMarkdown(convertFromRaw(fileData)))
                .then(mdData => resolve({ name: file, data: mdData }))
                .catch(err => reject(err));
            })
        )
      )
        // save all files in a new directory within filePath
        .then(
          fileData =>
            console.log(
              fileData
            ) /*Promise.all(fileData.map(({ name, data }) => perform write of data */
        )
        .catch(err => console.err("Error in exporting: ", err));
    }
  });
}

export default configureMenuActions;
