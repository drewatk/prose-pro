import React from "react";
import { connect } from "react-redux";

import { EditorState, convertFromRaw } from "draft-js";

import { Button } from "reactstrap";

import { UPDATE_EDITOR_STATE, SET_EDIT_STATE } from "app/actions/editor";

export const DiffViewer = props => {
  const { diffData, currentFile, gitAbstractions, dispatch } = props;
  // TODO: Bring blockquote & code styles from editor
  return (
    <div>
      <Button
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
            .catch(err =>
              console.error("Error in exiting checkpoint view: ", err)
            )
        }
      />
      <div style={{ height: "30px" }} />
      <div dangerouslySetInnerHTML={{ __html: diffData }} />
    </div>
  );
};

const mapStateToProps = ({
  editor: { diffData },
  currentFile,
  gitAbstractions
}) => ({ diffData, currentFile, gitAbstractions });

export default connect(mapStateToProps)(DiffViewer);
