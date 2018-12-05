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
    <div data-test-id="editor-page">
      <TitleBar />
      <div className={styles.container}>
        <div className={`${styles.rowHeight}`}>
          <div>
            {showFileList && (
              <div className={`${styles.left}`}>
                <FileList />
              </div>
            )}
          </div>

          <div className={`${styles.mid}`}>
            {currentFile && <EditorPanel />}
          </div>

          <div>
            {showHistory && (
              <div className={`${styles.right}`}>
                <History />
              </div>
            )}
          </div>
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
