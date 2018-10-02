import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StyleButton from "app/components/ProseEditor/StyleButton";

Enzyme.configure({ adapter: new Adapter() });

describe("StyleButton", () => {
  it("Matches Snapshot", () => {
    const wrapper = shallow(<StyleButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Matches Snapshot (active)", () => {
    const wrapper = shallow(<StyleButton active />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Toggles", () => {
    const onToggleMock = jest.fn();
    const wrapper = shallow(<StyleButton onToggle={onToggleMock} />);
    expect(wrapper.find(".styleButton")).toHaveLength(1);

    const mockEvent = { preventDefault: jest.fn() };
    wrapper.find(".styleButton").simulate("mousedown", mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
