import React from "react";
import { connect } from "react-redux";
import { stateToHTML } from "draft-js-export-html";

import { Button } from "reactstrap";

import { EditorState, convertFromRaw } from "draft-js";
import { UPDATE_EDITOR_STATE, SET_EDIT_STATE } from "app/actions/editor";

export const Viewer = props => {
  const { editorState, currentFile, gitAbstractions, dispatch } = props;
  // TODO: Bring blockquote & code styles from editor

  const html = stateToHTML(editorState.getCurrentContent());
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

const mapStateToProps = ({
  editor: { editorState },
  currentFile,
  gitAbstractions
}) => ({ editorState, currentFile, gitAbstractions });

const WithViewer = connect(mapStateToProps)(Viewer);

export default WithViewer;
