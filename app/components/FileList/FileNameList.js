import React from "react";
import { connect } from "react-redux";

import { loadFileHistory } from "app/actions/git_abs";
import { loadFile } from "app/actions/editor";
import fileSelect from "app/actions/file_selection";

import { ListGroup, ListGroupItem } from "reactstrap";

const FileNameList = ({ files, dispatch }) => (
  <div>
    <ListGroup>
      {files.map((file, index) => {
        return (
          <ListGroupItem
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() =>
              dispatch([
                fileSelect(file),
                /* TODO: LOAD file contents for use by editor */
                loadFile(file),
                loadFileHistory(file) // TODO: mapping file name to actual file??
              ])
            }
          >
            {file}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  </div>
);

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps
)(FileNameList);
