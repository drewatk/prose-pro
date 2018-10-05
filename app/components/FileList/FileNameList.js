import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";

import fileSelect from "app/actions/file_selection";

const FileNameList = ({ files, dispatch }) => {
  return (
    <div>
      <ListGroup>
        {files.map((file, index) => {
          return (
            <ListGroupItem
              key={index}
              onClick={() => dispatch([fileSelect(file)])}
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
