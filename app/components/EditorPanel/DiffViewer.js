import React from "react";
import { connect } from "react-redux";

import Viewer from "./Viewer";

import styles from "./Viewer.scss";

export const DiffViewer = ({ diffData }) => {
  // TODO: Bring blockquote & code styles from editor
  return (
    <Viewer>
      <div
        className={styles.diff}
        dangerouslySetInnerHTML={{ __html: diffData }}
      />
    </Viewer>
  );
};

const mapStateToProps = ({ editor: { diffData } }) => ({ diffData });

export default connect(mapStateToProps)(DiffViewer);
