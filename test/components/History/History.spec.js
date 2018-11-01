import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { History } from "app/components/History";

Enzyme.configure({ adapter: new Adapter() });

describe("History View", () => {
  it("should should display History View", () => {
    const now = new Date(10101).toLocaleString("en-US", { timeZone: "UTC" });
    const mockHistory = [
      { version: "first commit", timestamp: now },
      { version: "second commit", timestamp: now },
      { version: "third commit", timestamp: now }
    ];

    const wrapper = shallow(<History history={mockHistory} />);
    expect(wrapper).toMatchSnapshot();
  });
});
