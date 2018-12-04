import React from "react";
import Enzyme, { shallow } from "enzyme";
import _ from "lodash";
import Adapter from "enzyme-adapter-react-16";

import { AutoSave } from "app/components/AutoSave";

jest.mock("lodash");

_.debounce.mockImplementation(fn => fn);

Enzyme.configure({ adapter: new Adapter() });

jest.mock("draft-js", () => {
  return {
    convertToRaw: jest.fn()
  };
});

describe("AutoSave", () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
      editorState: {
        getCurrentContent: jest.fn().mockImplementation(() => {
          return {
            hasText: jest.fn().mockReturnValue(true),
            equals: jest.fn().mockReturnValue(false)
          };
        })
      }
    };

    const children = <div id="testid">Test</div>;

    const wrapper = shallow(<AutoSave {...props}>{children}</AutoSave>);

    // Force a save
    wrapper.instance().save();

    expect(props.gitAbstractions.saveFile).toHaveBeenCalledTimes(1);
  });

  it("calls saveFile on unmount", () => {
    const time = 1541179857371;
    const props = {
      gitAbstractions: {
        saveFile: jest.fn().mockResolvedValueOnce(),
        getLatestTime: jest.fn().mockResolvedValueOnce(time)
      },
      dispatch: jest.fn(),
      currentFile: "testfile",
      editorState: {
        getCurrentContent: jest.fn().mockImplementation(() => {
          return {
            hasText: jest.fn().mockReturnValue(true),
            equals: jest.fn().mockReturnValue(false)
          };
        })
      }
    };

    const children = <div id="testid">Test</div>;

    const wrapper = shallow(<AutoSave {...props}>{children}</AutoSave>);

    // Force a save
    wrapper.unmount();

    expect(props.gitAbstractions.saveFile).toHaveBeenCalledTimes(1);
  });
});
