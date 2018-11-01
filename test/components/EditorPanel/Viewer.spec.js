import React from "react";
import Enzyme, { shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Viewer } from "app/components/EditorPanel/Viewer";
import { stateToHTML } from "draft-js-export-html";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("draft-js-export-html", () => ({ stateToHTML: jest.fn() }));

describe("EditorPanel", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("matches snapshot (editable)", () => {
    const editorState = { getCurrentContent: jest.fn() };
    const wrapper = shallow(<Viewer editorState={editorState} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("sets inner html", () => {
    const editorState = { getCurrentContent: jest.fn() };
    const mockHTML = '<p id="test-id">Foobar!</p>';
    stateToHTML.mockReturnValueOnce(mockHTML);

    const wrapper = render(<Viewer editorState={editorState} />);

    expect(editorState.getCurrentContent).toHaveBeenCalledTimes(1);
    expect(stateToHTML).toHaveBeenCalledTimes(1);

    expect(wrapper.html()).toEqual(mockHTML);
  });
});
