import React from "react";
import { connect } from "react-redux";

import CreateFileForm from "../Forms/CreateFileForm";
import FileNameList from "./FileNameList";

const FileList = ({ files, createFile }) => {
  return (
    <div>
      <div>
        <CreateFileForm
          onSubmit={({ fileName }) => {
            createFile(fileName);
          }}
        />
      </div>
      <div style={{ backgroundColor: "lightblue", height: "100%" }}>
        FileList View
      </div>
      <div>
        <FileNameList files={files} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ gitAbstractions: { getFiles, createFile } }) => {
  if (getFiles) {
    return { files: getFiles(), createFile };
  }
  return { files: [], createFile };
};

export default connect(mapStateToProps)(FileList);
