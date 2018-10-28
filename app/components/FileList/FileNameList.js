import React from "react";
import { ListGroup } from "reactstrap";
import FileNameListItem from "./FileNameListItem";

const FileNameList = props => {
  const { files, onFileItemClick } = props;
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <FileNameListItem
              key={index}
              onFileItemClick={onFileItemClick}
              file={file}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};

export default FileNameList;
