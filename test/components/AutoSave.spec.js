import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
// import { platform } from "os";
import Adapter from "enzyme-adapter-react-16";

import { AutoSave } from "app/components/AutoSave";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("draft-js", () => {
  return {
    convertToRaw: jest.fn()
  };
});

describe("AutoSave", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it("renders children", () => {
    const children = <div id="testid">Test</div>;

    const wrapper = shallow(<AutoSave>{children}</AutoSave>);

    expect(wrapper.find("#testid")).toHaveLength(1);
  });

  it("calls saveFile", () => {
    const time = 1541179857371;
    const props = {
      gitAbstractions: {
        saveFile: jest.fn().mockResolvedValueOnce(),
        getLatestTime: jest.fn().mockResolvedValueOnce(time)
      },
      dispatch: jest.fn(),
      currentFile: "testfile",
      editorState: { getCurrentContent: jest.fn() }
    };

    const children = <div id="testid">Test</div>;

    const wrapper = mount(<AutoSave {...props}>{children}</AutoSave>);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().interval).toBeDefined();

    jest.advanceTimersByTime(6000);

    expect(props.editorState.getCurrentContent).toHaveBeenCalledTimes(1);
    expect(props.gitAbstractions.saveFile).toHaveBeenCalledTimes(1);
    // expect(props.gitAbstractions.getLatestTime).toHaveBeenCalledTimes(1);
    // expect(props.dispatch).toHaveBeenCalledTimes(1);
  });
});
