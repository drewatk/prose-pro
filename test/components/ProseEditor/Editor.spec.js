import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ContentState, EditorState } from "draft-js";
import { ProseEditor } from "../../../app/components/ProseEditor/Editor";

async function fillRTE(component, value) {
  const input = component.find("DraftEditor");

  input
    .instance()
    .update(EditorState.createWithContent(ContentState.createFromText(value)));
}

Enzyme.configure({ adapter: new Adapter() });

describe("ProseEditor", () => {
  let editorState, onSaveEditorState;

  beforeEach(() => {
    editorState = EditorState.createEmpty();
    onSaveEditorState = jest.fn();
  });

  it("should should display an editor", () => {
    const wrapper = shallow(
      <ProseEditor
        editorState={editorState}
        onSaveEditorState={onSaveEditorState}
      />
    );
    expect(wrapper.find("DraftEditor")).toHaveLength(1);
  });

  it("should should display BlockStyleControls", () => {
    const wrapper = shallow(
      <ProseEditor
        editorState={editorState}
        onSaveEditorState={onSaveEditorState}
      />
    );
    expect(wrapper.find("BlockStyleControls")).toHaveLength(1);
  });

  it("should should display InlineStyleControls", () => {
    const wrapper = shallow(
      <ProseEditor
        editorState={editorState}
        onSaveEditorState={onSaveEditorState}
      />
    );
    expect(wrapper.find("InlineStyleControls")).toHaveLength(1);
  });

  it("should call onSaveEditorState on update", () => {
    const wrapper = mount(
      <ProseEditor
        editorState={editorState}
        onSaveEditorState={onSaveEditorState}
      />
    );

    fillRTE(wrapper, "foobar");

    expect(onSaveEditorState).toHaveBeenCalled();
  });
});
