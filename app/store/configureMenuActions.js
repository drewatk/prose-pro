import { ipcRenderer } from "electron";
import { convertFromRaw, convertToRaw } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import path from "path";
import fs from "fs-extra";
import routes from "app/constants/routes.json";
import updateHistory, { UPDATE_LAST_SAVED } from "app/actions/history";
import { toggleShowHistory, toggleShowFileList } from "app/actions/view";
import { toggleTheme } from "app/actions/theme";
import { EDIT_MODE } from "app/reducers/editor";

function configureMenuActions(store) {
  /**
   * Save File Menu Action
   */
  ipcRenderer.on("save-file", () => {
    const { dispatch } = store;
    const {
      gitAbstractions,
      currentFile,
      editor: { editorState, editorMode }
    } = store.getState();

    if (
      editorMode === EDIT_MODE &&
      gitAbstractions &&
      currentFile &&
      editorState
    ) {
      gitAbstractions
        .saveFile(currentFile, convertToRaw(editorState.getCurrentContent()))
        .then(() => gitAbstractions.getLatestTime(currentFile))
        .then(time => dispatch({ type: UPDATE_LAST_SAVED, payload: time }))
        .catch(err => {
          console.error("Saving (menu action)", err);
        });
    }
  });

  /**
   * Export Project Action
   **/
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

  /**
   * Quick Checkpoint Action
   */
  ipcRenderer.on("quick-checkpoint", () => {
    const { dispatch } = store;
    const {
      editor: { editorState, editorMode },
      gitAbstractions,
      currentFile
    } = store.getState();
    const commitMessage = "Quick Checkpoint";

    if (
      editorMode === EDIT_MODE &&
      gitAbstractions &&
      currentFile &&
      editorState
    ) {
      gitAbstractions
        .saveFile(
          currentFile,
          convertToRaw(editorState.getCurrentContent()),
          commitMessage
        )
        .then(() => gitAbstractions.getVersions(currentFile))
        .then(({ versions }) => dispatch(updateHistory(versions)))
        .then(() => gitAbstractions.getLatestTime(currentFile))
        .then(time => dispatch({ type: UPDATE_LAST_SAVED, payload: time }))
        .catch(err => {
          console.error("Error creating quick checkpoint: ", err);
        });
    }
  });

  /**
   * File View Toggler
   */
  ipcRenderer.on("toggle-file-view", () => {
    const { dispatch } = store;
    const {
      router: {
        location: { pathname }
      }
    } = store.getState();
    if (pathname === routes.EDITOR) {
      dispatch(toggleShowFileList());
    }
  });

  /**
   * History view toggler
   */
  ipcRenderer.on("toggle-history-view", () => {
    const { dispatch } = store;
    const {
      router: {
        location: { pathname }
      }
    } = store.getState();
    if (pathname === routes.EDITOR) {
      dispatch(toggleShowHistory());
    }
  });

  /**
   * Theme toggler
   */
  ipcRenderer.on("toggle-theme", () => {
    const { dispatch } = store;
    dispatch(toggleTheme());
  });
}

export default configureMenuActions;
