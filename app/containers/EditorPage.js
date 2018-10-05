import React from "react";
import { connect } from "react-redux";
import ProseEditor from "app/components/ProseEditor";
import TitleBar from "app/components/TitleBar";
import FileList from "app/components/FileList";
import History from "app/components/History";
import CheckpointForm from "app/components/Forms/CheckpointForm";

import styles from "./EditorPage.scss";

const EditorPage = props => {
  const { showHistory, showFileList } = props;
  return (
    <div className={`${styles.container} conatiner-fluid`}>
      <TitleBar />
      <div className={`${styles.row} row no-gutters`}>
        {showFileList && (
          <div className={`${styles.col} col-2`}>
            <FileList />
          </div>
        )}
        <div className={`${styles.col} col`}>
          {/* TODO: should this onSubmit be in a different place? */}
          <CheckpointForm
            onSubmit={({ commitMessage }) =>
              console.log("Submitted new checkpoint: ", commitMessage)
            }
          />
          <ProseEditor />
        </div>
        {showHistory && (
          <div className={`${styles.col} col-2`}>
            <History />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showFileList: state.view.showFileList,
    showHistory: state.view.showHistory
  };
};

const WithEditorPage = connect(mapStateToProps)(EditorPage);

WithEditorPage.displayName = "EditorPage";
export default WithEditorPage;
