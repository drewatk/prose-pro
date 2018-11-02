import React from "react";
import Enzyme, { shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Viewer } from "app/components/EditorPanel/Viewer";
import { stateToHTML } from "draft-js-export-html";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("draft-js-export-html", () => ({ stateToHTML: jest.fn() }));
jest.mock("draft-js");

describe("Viewer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("matches snapshot", () => {
    const props = {
      editorState: { getCurrentContent: jest.fn() },
      dispatch: jest.fn(),
      currentFile: "currentfile",
      gitAbstractions: {
        switchToCurrentVersion: jest.fn().mockResolvedValue("fileData")
      }
    };
    const wrapper = shallow(<Viewer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("sets inner html", () => {
    const props = {
      editorState: { getCurrentContent: jest.fn() },
      dispatch: jest.fn(),
      currentFile: "currentfile",
      gitAbstractions: {
        switchToCurrentVersion: jest.fn().mockResolvedValue("fileData")
      }
    };
    const mockHTML = '<p id="test-id">Foobar!</p>';
    stateToHTML.mockReturnValueOnce(mockHTML);

    const wrapper = render(<Viewer {...props} />);

    expect(props.editorState.getCurrentContent).toHaveBeenCalledTimes(1);
    expect(stateToHTML).toHaveBeenCalledTimes(1);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
