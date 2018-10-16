import React from "react";
import { connect } from "react-redux";
import { stateToHTML } from "draft-js-export-html";

// import styles from "app/components/ProseEditor/ProseEditor.css";

const Viewer = props => {
  const { editorState } = props;
  // TODO: Bring blockquote & code styles from editor
  // const options = {
  // blockStyleFn: block => {
  //   switch (block.getType()) {
  //     case "blockquote":
  //       return { attributes: { class: styles.blockquote } };
  //     default:
  //       return null;
  //   }
  // },
  // inlineStyles: {
  //   CODE: {
  //     element: "span",
  //     style: {
  //       backgroundColor: "rgba(0, 0, 0, 0.05)",
  //       fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
  //       fontSize: 16,
  //       padding: 2
  //     }
  //   }
  // }
  // };
  const html = stateToHTML(editorState.getCurrentContent());
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const mapStateToProps = ({ editor: { editorState } }) => ({ editorState });

const WithViewer = connect(mapStateToProps)(Viewer);

export default WithViewer;
