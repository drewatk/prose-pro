import React from "react";
import { connect } from "react-redux";

import Viewer from "./Viewer";

export const DiffViewer = ({ diffData }) => {
  // TODO: Bring blockquote & code styles from editor
  return (
    <Viewer>
      <div dangerouslySetInnerHTML={{ __html: diffData }} />
    </Viewer>
  );
};

const mapStateToProps = ({ editor: { diffData } }) => ({ diffData });

export default connect(mapStateToProps)(DiffViewer);
