import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { SELECT_FILE } from "app/actions/file_selection";

const FileNameList = props => {
  const { files, dispatch } = props;
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <ListGroupItem
              key={index}
              onClick={() => dispatch({ type: SELECT_FILE, payload: file })}
            >
              {file}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default connect(
  null,
  dispatch => ({ dispatch })
)(FileNameList);
