import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CheckpointCard } from "app/components/History/CheckpointCard";

Enzyme.configure({ adapter: new Adapter() });

describe("CheckpointCard", () => {
  it("matches snapshot", () => {
    const props = { version: "test message", timestamp: 10123 };
    const wrapper = shallow(<CheckpointCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("shows dropdown on click", () => {
    const props = { version: "test message", timestamp: 10123 };
    const wrapper = mount(<CheckpointCard {...props} />);

    wrapper.find("i").simulate("click");

    expect(wrapper.state("dropdownOpen")).toBeTruthy();
  });
});
