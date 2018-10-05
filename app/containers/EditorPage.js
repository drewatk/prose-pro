import React from "react";
import { connect } from "react-redux";
import ProseEditor from "app/components/ProseEditor";
import TitleBar from "app/components/TitleBar";
import FileList from "app/components/FileList";
import History from "app/components/History";
import CheckpointForm from "app/components/Forms/CheckpointForm";

const EditorPage = ({ file, showHistory, showFileList }) => (
  <div className="conatiner-fluid">
    <TitleBar />
    <div className="row no-gutters">
      {showFileList && (
        <div className="col-2">
          <FileList />
        </div>
      )}
      {file && (
        <div className="col">
          {" "}
          <ProseEditor />
        </div>
      )}
      {file &&
        showHistory && (
          <div className="col-2">
            <History />
          </div>
        )}
    </div>
    <CheckpointForm
      onSubmit={({ commitMessage }) =>
        console.log("Submitted new checkpoint: ", commitMessage)
      }
    />
  </div>
);

const mapStateToProps = state => {
  return {
    showFileList: state.view.showFileList,
    showHistory: state.view.showHistory,
    file: state.currentFile
  };
};

const WithEditorPage = connect(mapStateToProps)(EditorPage);

WithEditorPage.displayName = "EditorPage";
export default WithEditorPage;
