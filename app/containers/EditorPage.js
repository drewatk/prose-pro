import React from "react";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";

import EditorPanel from "app/components/EditorPanel";
import TitleBar from "app/components/TitleBar";
import FileList from "app/components/FileList";
import History from "app/components/History";
import CheckpointForm from "app/components/Forms/CheckpointForm";
import { Button } from "reactstrap";
import styles from "./EditorPage.scss";

import updateHistory from "app/actions/history";

const EditorPage = props => {
  const {
    dispatch,
    showHistory,
    showFileList,
    currentFile,
    gitAbstractions,
    editorState
  } = props;
  return (
    <div>
      <TitleBar />
      <div className={`${styles.container} conatiner-fluid`}>
        <div className={`${styles.rowHeight} row no-gutters`}>
          {showFileList && (
            <div className={`${styles.left} col-2`}>
              <FileList />
            </div>
          )}
          <div className={`${styles.mid} col`}>
            {/* TODO: should this onSubmit be in a different place? */}
            <CheckpointForm
              onSubmit={({ commitMessage }) =>
                gitAbstractions
                  .saveFile(
                    currentFile,
                    convertToRaw(editorState.getCurrentContent()),
                    commitMessage
                  )
                  .then(() => gitAbstractions.getVersions(currentFile))
                  .then(({ versions }) => dispatch(updateHistory(versions)))
              }
            />
            <Button
              onClick={() =>
                gitAbstractions.saveFile(
                  currentFile,
                  convertToRaw(editorState.getCurrentContent())
                )
              }
            >
              Save
            </Button>
            {currentFile && <EditorPanel />}
          </div>
          {showHistory && (
            <div className={`${styles.right} col-2`}>
              <History />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  view: { showFileList, showHistory },
  editor: { editorState },
  currentFile,
  gitAbstractions
}) => {
  return {
    showFileList,
    showHistory,
    currentFile,
    gitAbstractions,
    editorState
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const WithEditorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);

WithEditorPage.displayName = "EditorPage";
export default WithEditorPage;
