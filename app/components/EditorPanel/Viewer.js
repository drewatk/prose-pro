import React from "react";
import { connect } from "react-redux";
import { stateToHTML } from "draft-js-export-html";

export const Viewer = props => {
  const { editorState } = props;
  // TODO: Bring blockquote & code styles from editor

  const html = stateToHTML(editorState.getCurrentContent());
  return <div id="viewer-content" dangerouslySetInnerHTML={{ __html: html }} />;
};

const mapStateToProps = ({ editor: { editorState } }) => ({ editorState });

const WithViewer = connect(mapStateToProps)(Viewer);

export default WithViewer;
