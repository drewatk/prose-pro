import React from "react";
import { connect } from "react-redux";

import CreateFileForm from "../Forms/CreateFileForm";
import FileNameList from "./FileNameList";

import selectFile from "app/actions/file_selection";
import updateFiles from "app/actions/files";

const FileList = ({ files, gitAbstractions, dispatch }) => {
  return (
    <div>
      <div>
        <CreateFileForm
          onSubmit={({ fileName }) => {
            gitAbstractions
              .createFile(fileName)
              .then(() => dispatch(updateFiles(gitAbstractions.getFiles())))
              .then(() => dispatch(selectFile(gitAbstractions, fileName)))
              .catch(err =>
                console.error("Error in CreateFileForm onSubmit: ", err)
              );
          }}
        />
      </div>
      <div style={{ backgroundColor: "lightblue", height: "100%" }}>
        FileList View
      </div>
      <div>
        <FileNameList
          files={files}
          onFileItemClick={file => {
            dispatch([
              selectFile(gitAbstractions, file)
              /* load file data */
              /* load file checkpoints */
            ]);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ files, gitAbstractions }) => ({
  files,
  gitAbstractions
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
