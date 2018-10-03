import React from "react";
import { connect } from "react-redux";

const FileList = ({ files }) => (
  <div style={{ backgroundColor: "lightblue", height: "100%" }}>
    FileList View
    {files.map((file, index) => (
      <p key={index}>{file}</p>
    ))}
  </div>
);

const mapStateToProps = ({ gitAbstractions: { getFiles } }) => {
  if (getFiles) {
    return { files: getFiles() };
  }
  return { files: [] };
};

export default connect(mapStateToProps)(FileList);
