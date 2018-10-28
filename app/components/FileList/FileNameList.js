import React from "react";
import { connect } from "react-redux";

import { ListGroup } from "reactstrap";
import FileNameListItem from "./FileNameListItem";

const FileNameList = props => {
  const { files, onFileItemClick, currentFile } = props;
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <FileNameListItem
              key={index}
              onFileItemClick={onFileItemClick}
              file={file}
              styles={{
                cursor: "pointer",
                backgroundColor: currentFile === file ? "#e8e9ea" : "#fff"
              }}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};

const mapStateToProps = ({ currentFile }) => ({ currentFile });

export default connect(mapStateToProps)(FileNameList);
