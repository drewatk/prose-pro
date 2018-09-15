import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';

import styles from './ProseEditor.css';

const MAX_TAB_DEPTH = 4;

/**
 * Adapted from draft-js rich editor example
 * https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/rich/rich.html
 */
class ProseEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.editorRef = React.createRef();
    this.focus = () => this.editorRef.current.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
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

  mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        MAX_TAB_DEPTH
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let hidePlaceholderClass = false;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        hidePlaceholderClass = true;
      }
    }
    return (
      <div className={styles.root}>
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
            hidePlaceholderClass ? styles.hidePlaceholder : ''
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return styles.blockquote;
    default:
      return null;
  }
}

export default ProseEditor;
