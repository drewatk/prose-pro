import React from "react";
import ProseEditor from "app/components/ProseEditor";
import Viewer from "./Viewer";
import AutoSave from "app/components/AutoSave";

const EditorPanel = props => {
  const { isEditable } = props;

  return (
    <React.Fragment>
      {isEditable && (
        <AutoSave>
          <ProseEditor />
        </AutoSave>
      )}
      {!isEditable && <Viewer />}
    </React.Fragment>
  );
};

export default EditorPanel;
