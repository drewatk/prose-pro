import React from "react";
import Enzyme, { shallow } from "enzyme";
// import { platform } from "os";
import Adapter from "enzyme-adapter-react-16";
import routes from "app/constants/routes.json";
import { TitleBar } from "app/components/TitleBar/TitleBar";

Enzyme.configure({ adapter: new Adapter() });

// Todo: this seems innefective
jest.mock("os");

describe("TitleBar", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<TitleBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches snapshot (on editor page)", () => {
    const pathname = routes.EDITOR;

    const wrapper = shallow(<TitleBar pathname={pathname} />);
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: Unable to mock os module correctly
  // it("Doesn't show span on Windows", () => {
  //   platform.mockReturnValueOnce("win32");
  //   const wrapper = shallow(<TitleBar />);
  //   expect(wrapper.find(".titleBarDarwin").exists()).toBeFalsy();
  // });

  // it("Doesn't shows span on OSX", () => {
  //   platform.mockReturnValueOnce("darwin");

  //   console.log(platform);
  //   const wrapper = shallow(<TitleBar />);
  //   expect(wrapper.find(".titleBarDarwin").exists()).toBeTruthy();
  // });

  it("Displays nav on Editor route", () => {
    const pathname = routes.EDITOR;

    const wrapper = shallow(<TitleBar pathname={pathname} />);

    expect(wrapper.find("Nav").exists()).toBeTruthy();
  });

  it("calls onFilesClick", () => {
    const onFilesClick = jest.fn();
    const pathname = routes.EDITOR;

    const wrapper = shallow(
      <TitleBar pathname={pathname} onFilesClick={onFilesClick} />
    );

    wrapper.find("#files-button").simulate("click");
    expect(onFilesClick).toHaveBeenCalledTimes(1);
  });

  it("calls onHistoryClick", () => {
    const onHistoryClick = jest.fn();
    const pathname = routes.EDITOR;

    const wrapper = shallow(
      <TitleBar pathname={pathname} onHistoryClick={onHistoryClick} />
    );

    wrapper.find("#history-button").simulate("click");
    expect(onHistoryClick).toHaveBeenCalledTimes(1);
  });
});
