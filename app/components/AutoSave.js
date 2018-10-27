import React from "react";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";

const AUTOSAVE_DELAY_MS = 5 * 1000;

export class AutoSave extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.save();
    }, AUTOSAVE_DELAY_MS);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  save() {
    const { gitAbstractions, currentFile, editorState } = this.props;

    if (gitAbstractions && currentFile && editorState) {
      gitAbstractions.saveFile(
        currentFile,
        convertToRaw(editorState.getCurrentContent())
      );
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
