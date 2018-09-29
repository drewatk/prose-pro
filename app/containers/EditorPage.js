import React from "react";
import { connect } from "react-redux";
import ProseEditor from "app/components/ProseEditor";
import TitleBar from "app/components/TitleBar";
import FileList from "app/components/FileList";
import History from "app/components/History";

const EditorPage = props => {
  const { showHistory, showFileList } = props;
  return (
    <div className="conatiner-fluid">
      <TitleBar />
      <div className="row no-gutters">
        {showFileList && (
          <div className="col-2">
            <FileList />
          </div>
        )}
        <div className="col">
          {" "}
          <ProseEditor />
        </div>
        {showHistory && (
          <div className="col-2">
            <History />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showFileList: state.view.showFileList,
    showHistory: state.view.showHistory
  };
};

const WithEditorPage = connect(mapStateToProps)(EditorPage);

WithEditorPage.displayName = "EditorPage";
export default WithEditorPage;
