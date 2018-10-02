import React from "react";
import FileNameList from "./FileNameList";

const FileList = () => {
  const files = [{ name: "file 1" }, { name: "file 2" }, { name: "file 3" }];
  return (
    <div>
      <div style={{ backgroundColor: "lightblue", height: "100%" }}>
        FileList View
      </div>
      <div>
        <FileNameList files={files} />
      </div>
    </div>
  );
};

export default FileList;
