import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";

const FileNameList = props => {
  const { files, onFileItemClick, currentFile } = props;
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <ListGroupItem
              id="file-item"
              key={index}
              onClick={() => onFileItemClick(file)}
              style={{
                cursor: "pointer",
                backgroundColor: currentFile === file ? "#e8e9ea" : "#fff"
              }}
            >
              {file}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

const mapStateToProps = ({ currentFile }) => ({ currentFile });

export default connect(mapStateToProps)(FileNameList);
