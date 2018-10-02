import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { History } from "app/components/History";

Enzyme.configure({ adapter: new Adapter() });

describe("History View", () => {
  it("should should display History View", () => {
    const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
    const mockHistory = [
      { message: "first commit", date: now },
      { message: "second commit", date: now },
      { message: "third commit", date: now }
    ];

    const wrapper = shallow(<History history={mockHistory} />);
    expect(wrapper.find("CheckpointCard")).toHaveLength(mockHistory.length);
    mockHistory.forEach(({ message }) => expect(wrapper.find(message)));
  });
});
