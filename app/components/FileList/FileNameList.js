import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
const FileNameList = props => {
  const { files } = props;
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <ListGroupItem key={index} onClick="">
              {file.name}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default FileNameList;
