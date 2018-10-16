import React from "react";
import { connect } from "react-redux";
import { stateToHTML } from "draft-js-export-html";

const Viewer = props => {
  const { editorState } = props;
  const html = stateToHTML(editorState.getCurrentContent());
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const mapStateToProps = ({ editor: { editorState } }) => ({ editorState });

const WithViewer = connect(mapStateToProps)(Viewer);

export default WithViewer;
