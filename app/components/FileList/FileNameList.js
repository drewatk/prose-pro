import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const FileNameList = props => {
  const { files, onFileItemClick } = props;
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <ListGroupItem
              id="file-item"
              key={index}
              onClick={() => onFileItemClick(file)}
              style={{ cursor: "pointer" }}
            >
              {file}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default FileNameList;
