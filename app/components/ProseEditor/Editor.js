import React from "react";
import { connect } from "react-redux";
import { Editor, RichUtils, getDefaultKeyBinding } from "draft-js";
import { Button } from "reactstrap";
import { convertToRaw } from "draft-js";

import InlineStyleControls from "./InlineStyleControls";
import BlockStyleControls from "./BlockStyleControls";
import { UPDATE_EDITOR_STATE } from "../../actions/editor";

import styles from "./ProseEditor.css";

const MAX_TAB_DEPTH = 4;

/**
 * Adapted from draft-js rich editor example
 * https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/rich/rich.html
 * Also referenced this article to connect to Redux: https://reactrocket.com/post/draft-js-and-redux/
 */
export class ProseEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.focus = () => this.editorRef.current.editor.focus();
    this.onChange = editorState => this.props.onSaveEditorState(editorState);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  /**
   * @todo Tab capturing is currently not working
   * @param {SyntheticEvent} e
   */
  mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.props.editorState,
        MAX_TAB_DEPTH
      );
      if (newEditorState !== this.props.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState, currentFile, gitAbstractions } = this.props;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let hidePlaceholderClass = false;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        hidePlaceholderClass = true;
      }
    }
    return (
      <div className={styles.root}>
        <Button
          onClick={() =>
            gitAbstractions.saveFile(
              currentFile,
              convertToRaw(editorState.getCurrentContent())
            )
          }
        >
          Save
        </Button>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div
          className={`${styles.editor} ${
            hidePlaceholderClass ? styles.hidePlaceholder : ""
          }`}
          onClick={this.focus}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref={this.editorRef}
            spellCheck
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return styles.blockquote;
    default:
      return null;
  }
}

const mapStateToProps = ({
  editor: { editorState },
  currentFile,
  gitAbstractions
}) => ({ editorState, currentFile, gitAbstractions });

const mapDispatchToProps = dispatch => ({
  onSaveEditorState: editorState => {
    dispatch({
      type: UPDATE_EDITOR_STATE,
      payload: editorState
    });
  }
});

const WithProseEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProseEditor);

export default WithProseEditor;
