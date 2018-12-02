import { ipcRenderer } from "electron";
import { convertFromRaw, convertToRaw } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import path from "path";
import fs from "fs-extra";

import { UPDATE_LAST_SAVED } from "app/actions/history";
import routes from "app/constants/routes.json";

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

  ipcRenderer.on("export-project", async (_, filePath) => {
    const { currentProject, files, gitAbstractions, router } = store.getState();
    const withFileExtension = file => file + ".md";
    if (router.location.pathname === routes.EDITOR) {
      const projectPath = path.resolve(filePath, currentProject);

      await fs.ensureDir(projectPath);
      let fileData = [];
      for (const file of files) {
        const rawData = await gitAbstractions.openFile(file);
        /* NOTE: stateToMarkdown does not handle underlined Markdown correctly */
        const mdData = stateToMarkdown(convertFromRaw(rawData));
        fileData.push({ fileName: withFileExtension(file), data: mdData });
      }

      Promise.all(
        fileData.map(({ fileName, data }) =>
          fs.writeFile(path.resolve(projectPath, fileName), data)
        )
      ).catch(err => console.error("Error in exporting: ", err));
    }
  });
}

export default configureMenuActions;
