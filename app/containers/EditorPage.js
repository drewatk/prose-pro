import React from "react";
import { connect } from "react-redux";

import EditorPanel from "app/components/EditorPanel";
import TitleBar from "app/components/TitleBar";
import FileList from "app/components/FileList";
import History from "app/components/History";

import styles from "./EditorPage.scss";

import ErrorModal from "app/components/ErrorModal";

const EditorPage = ({ showHistory, showFileList, currentFile }) => (
  <ErrorModal>
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
  </ErrorModal>
);

const mapStateToProps = ({
  view: { showFileList, showHistory },
  currentFile
}) => {
  return {
    showFileList,
    showHistory,
    currentFile
  };
};

const WithEditorPage = connect(mapStateToProps)(EditorPage);

WithEditorPage.displayName = "EditorPage";
export default WithEditorPage;
