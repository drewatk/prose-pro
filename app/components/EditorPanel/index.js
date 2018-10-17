import React from "react";
import ProseEditor from "app/components/ProseEditor";
import Viewer from "./Viewer";

const EditorPanel = props => {
  const { isEditable } = props;

  return (
    <React.Fragment>
      {isEditable && <ProseEditor />}
      {!isEditable && <Viewer />}
    </React.Fragment>
  );
};

export default EditorPanel;
