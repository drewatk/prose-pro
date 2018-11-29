import React from "react";
import { connect } from "react-redux";
import ProseEditor from "app/components/ProseEditor";
import DiffViewer from "./DiffViewer";
import MDViewer from "./MDViewer";
import AutoSave from "app/components/AutoSave";

import { EDIT_MODE, DIFF_MODE, VIEW_MODE } from "app/reducers/editor";

const viewSelect = {
  [EDIT_MODE]: (
    <AutoSave>
      <ProseEditor />
    </AutoSave>
  ),
  [DIFF_MODE]: <DiffViewer />,
  [VIEW_MODE]: <MDViewer />
};

export const EditorPanel = ({ editorMode }) => viewSelect[editorMode];

EditorPanel.displayName = "EditorPanel";

const mapStateToProps = ({ editor: { editorMode } }) => ({ editorMode });
const WithEditorPanel = connect(mapStateToProps)(EditorPanel);

export default WithEditorPanel;
