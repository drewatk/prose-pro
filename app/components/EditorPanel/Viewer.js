import React from "react";
import { connect } from "react-redux";

import { EditorState, convertFromRaw } from "draft-js";

import { Button } from "reactstrap";

import { UPDATE_EDITOR_STATE, SET_EDIT_STATE } from "app/actions/editor";
import { showError } from "app/actions/error";

import styles from "./Viewer.scss";

export const Viewer = ({
  gitAbstractions,
  currentFile,
  dispatch,
  children
}) => (
  <div className={styles.viewer}>
    <Button
      close
      className={styles.closeButton}
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
    <div className={styles.container}>{children}</div>
  </div>
);

const mapStateToProps = ({ gitAbstractions, currentFile }) => ({
  gitAbstractions,
  currentFile
});

export default connect(mapStateToProps)(Viewer);
