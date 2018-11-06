import React from "react";
import { connect } from "react-redux";
import { ContentState, convertToRaw } from "draft-js";

import CreateFileForm from "../Forms/CreateFileForm";
import FileNameList from "./FileNameList";

import selectFile, { deSelectFile } from "app/actions/file_selection";
import updateFiles from "app/actions/files";

const FileList = ({ files, gitAbstractions, currentFile, dispatch }) => {
  return (
    <div>
      <div>
        <CreateFileForm
          onSubmit={({ fileName }) => {
            const emptyFileContentState = ContentState.createFromText("");
            gitAbstractions
              .createFile(fileName, convertToRaw(emptyFileContentState))
              .then(() => dispatch(updateFiles(gitAbstractions.getFiles())))
              .then(() => dispatch(selectFile(gitAbstractions, fileName)))
              .catch(err =>
                console.error("Error in CreateFileForm onSubmit: ", err)
              );
          }}
        />
      </div>
      {/* TODO:  Move Styles to CSS file  */}
      <div style={{ backgroundColor: "lightblue", height: "100%" }}>
        FileList View
      </div>
      <div>
        <FileNameList
          files={files}
          onFileItemClick={file => {
            dispatch(selectFile(gitAbstractions, file));
          }}
          onFileDeleteClick={file => {
            const current = currentFile;
            gitAbstractions
              .deleteFile(file)
              .then(() => {
                dispatch(updateFiles(gitAbstractions.getFiles()));
              })
              .then(() => {
                if (current === file) {
                  dispatch(deSelectFile());
                }
              })
              .catch(err =>
                console.error(
                  "Error in CreateFileForm onFileDeleteClick: ",
                  err
                )
              );
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ files, gitAbstractions, currentFile }) => ({
  files,
  gitAbstractions,
  currentFile
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
