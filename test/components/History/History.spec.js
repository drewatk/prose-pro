import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CheckpointCard from "app/components/History/CheckpointCardTest";

Enzyme.configure({ adapter: new Adapter() });

describe("History View", () => {
  it("should display History View", () => {
    const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
    const history = [
      { version: "first commit", timestamp: now, commit: "<placehold commit>" },
      {
        version: "second commit",
        timestamp: now,
        commit: "<placehold commit>"
      },
      { version: "third commit", timestamp: now, commit: "<placehold commit>" }
    ];

    const wrapper = shallow(
      <div>
        {history.map((data, index) => (
          <CheckpointCard key={index} {...data} />
        ))}
      </div>
    );

    expect(wrapper.find("CheckpointCard")).toHaveLength(history.length);
  });

  it("should toggle CheckpointCard options", () => {
    const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
    const checkpoint = {
      version: "welcome to git",
      timestamp: now,
      commit: "12KjkJ4554"
    };
    const wrapper = shallow(<CheckpointCard {...checkpoint} />);
    expect(wrapper.state("dropdownOpen")).toBe(false);
    wrapper.setState({ dropdownOpen: true });
    expect(wrapper.find("DropdownItem")).toHaveLength(2);
  });
});
