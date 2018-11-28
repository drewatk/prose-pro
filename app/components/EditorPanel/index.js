import React from "react";
import { connect } from "react-redux";
import ProseEditor from "app/components/ProseEditor";
import DiffViewer from "./DiffViewer";
import MDViewer from "./MDViewer";
import AutoSave from "app/components/AutoSave";

import { EDIT_MODE, DIFF_MODE } from "app/reducers/editor";

export const EditorPanel = ({ editorMode }) => {
  if (editorMode === EDIT_MODE) {
    return (
      <AutoSave>
        <ProseEditor />
      </AutoSave>
    );
  } else if (editorMode === DIFF_MODE) {
    return <DiffViewer />;
  } else {
    return <MDViewer />;
  }
};

EditorPanel.displayName = "EditorPanel";

const mapStateToProps = ({ editor: { editorMode } }) => ({ editorMode });
const WithEditorPanel = connect(mapStateToProps)(EditorPanel);

export default WithEditorPanel;
