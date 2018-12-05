import React from "react";
import { connect } from "react-redux";

import { EditorState, convertFromRaw } from "draft-js";

import { Button } from "reactstrap";

import { UPDATE_EDITOR_STATE, SET_EDIT_STATE } from "app/actions/editor";
import { showError } from "app/actions/error";

export const Viewer = ({
  gitAbstractions,
  currentFile,
  dispatch,
  children
}) => (
  <div>
    <Button
      data-test-id="viewer-close-button"
      close
      style={{ cursor: "pointer", float: "right", marginRight: "50px" }}
      onClick={() =>
        gitAbstractions
          .switchToCurrentVersion(currentFile)
          .then(fileData =>
            dispatch({
              type: UPDATE_EDITOR_STATE,
              payload: EditorState.createWithContent(convertFromRaw(fileData))
            })
          )
          .then(() => dispatch({ type: SET_EDIT_STATE }))
          .catch(err => {
            console.error("Error in exiting checkpoint view: ", err);
            dispatch(showError(err.message));
          })
      }
    />
    {children}
  </div>
);

const mapStateToProps = ({ gitAbstractions, currentFile }) => ({
  gitAbstractions,
  currentFile
});

export default connect(mapStateToProps)(Viewer);
