import React from "react";
import { connect } from "react-redux";
import { stateToHTML } from "draft-js-export-html";

import Viewer from "./Viewer";

export const MDViewer = ({ editorState }) => {
  // TODO: Bring blockquote & code styles from editor
  const html = stateToHTML(editorState.getCurrentContent());
  return (
    <Viewer>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Viewer>
  );
};

const mapStateToProps = ({ editor: { editorState } }) => ({ editorState });

export default connect(mapStateToProps)(MDViewer);
