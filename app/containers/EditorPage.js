import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import ProseEditor from "app/components/ProseEditor";
import TitleBar from "app/components/TitleBar";
import FileList from "app/components/FileList";
import History from "app/components/History";
import CheckpointForm from "app/components/Forms/CheckpointForm";

import { loadFileHistory } from "app/actions/git_abs";
import { addAndCommit } from "app/git-abs/git";

const EditorPage = ({
  showHistory,
  showFileList,
  dispatch,
  file,
  gitAbstractions,
  editorState
}) => (
  <div className="conatiner-fluid">
    <TitleBar />
    <div className="row no-gutters">
      {showFileList && (
        <div className="col-2">
          <FileList />
        </div>
      )}
      <div className="col">
        {" "}
        {file && (
          <div>
            <ProseEditor />
            <Button
              size="sm"
              color="secondary"
              onClick={() =>
                gitAbstractions
                  .saveFile(file, editorState.getCurrentContent())
                  .then(() => console.log("saved"))
                  .catch(e => console.log(e))
              }
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {showHistory && (
        <div className="col-2">
          <History />
        </div>
      )}
    </div>
    <CheckpointForm
      onSubmit={({ commitMessage }) => {
        addAndCommit(/* TODO: file path */)(commitMessage)
          .then(() => {
            dispatch(loadFileHistory(/* File */));
          })
          .catch(err =>
            console.error("Error in CheckpointForm submission: ", err)
          );
      }}
    />
  </div>
);

const mapStateToProps = state => {
  return {
    showFileList: state.view.showFileList,
    showHistory: state.view.showHistory,
    file: state.currentFile,
    gitAbstractions: state.gitAbstractions,
    editorState: state.editor.editorState
  };
};

const WithEditorPage = connect(mapStateToProps)(EditorPage);

WithEditorPage.displayName = "EditorPage";
export default WithEditorPage;
