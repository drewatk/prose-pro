import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Viewer } from "app/components/EditorPanel/Viewer";

Enzyme.configure({ adapter: new Adapter() });

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

  it("renders children", () => {
    const props = {
      editorState: { getCurrentContent: jest.fn() },
      dispatch: jest.fn(),
      currentFile: "currentfile",
      gitAbstractions: {
        switchToCurrentVersion: jest.fn().mockResolvedValue("fileData")
      },
      children: (
        <div id="testid">
          <p>Test!</p>
        </div>
      )
    };

    const wrapper = shallow(<Viewer {...props} />);

    expect(wrapper.find("#testid")).toHaveLength(1);
  });
});
