import React from "react";
import { connect } from "react-redux";

import FileNameList from "./FileNameList";

const FileList = ({ files }) => (
  <div>
    <div style={{ backgroundColor: "lightblue", height: "100%" }}>
      FileList View
    </div>
    <div>
      <FileNameList files={files} />
    </div>
  </div>
);

const mapStateToProps = ({ gitAbstractions: { getFiles } }) => {
  if (getFiles) {
    return { files: getFiles() };
  }
  return { files: [] };
};

export default connect(mapStateToProps)(FileList);
