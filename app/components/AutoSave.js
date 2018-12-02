import React from "react";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";
import _ from "lodash";
import { UPDATE_LAST_SAVED } from "app/actions/history";

const AUTOSAVE_WAIT = 5 * 1000;

export class AutoSave extends React.Component {
  componentDidMount() {
    this.debouncedSave = _.debounce(this.save, AUTOSAVE_WAIT, {
      trailing: true
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.editorState &&
      prevProps.editorState.getCurrentContent().hasText() &&
      this.props.editorState !== prevProps.editorState &&
      !this.props.editorState
        .getCurrentContent()
        .equals(prevProps.editorState.getCurrentContent())
    ) {
      this.debouncedSave();
    }
  }

  componentWillUnmount() {
    if (this.debouncedSave) {
      this.debouncedSave.cancel();
      this.save();
    }
  }

  save() {
    console.log("Autosaving at", new Date().toLocaleTimeString());
    const { gitAbstractions, currentFile, editorState, dispatch } = this.props;

    if (gitAbstractions && currentFile && editorState) {
      gitAbstractions
        .saveFile(currentFile, convertToRaw(editorState.getCurrentContent()))
        .then(() => gitAbstractions.getLatestTime(currentFile))
        .then(time => dispatch({ type: UPDATE_LAST_SAVED, payload: time }))
        .catch(err => {
          console.error("Error autosaving", err);
        });
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = ({
  editor: { editorState },
  currentFile,
  gitAbstractions
}) => {
  return {
    currentFile,
    gitAbstractions,
    editorState
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const WithAutoSave = connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoSave);

export default WithAutoSave;
