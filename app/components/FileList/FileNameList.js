import React from "react";
import { connect } from "react-redux";

import { ListGroup } from "reactstrap";
import FileNameListItem from "./FileNameListItem";

import styles from "./FileNameList.scss";

export const FileNameList = props => {
  const { files, onFileItemClick, onFileDeleteClick, currentFile } = props;
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <FileNameListItem
              key={index}
              onFileItemClick={onFileItemClick}
              file={file}
              className={`${styles.item} ${
                currentFile == file ? styles.activeItem : ""
              }`}
              onFileDeleteClick={onFileDeleteClick}
            />
          );
        })}
      </ListGroup>
    </div>
  );
};

const mapStateToProps = ({ currentFile }) => ({ currentFile });

export default connect(mapStateToProps)(FileNameList);
