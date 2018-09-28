import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProjectSetup from "../../../app/components/ProjectSetup";

Enzyme.configure({ adapter: new Adapter() });

describe("ProjectSetup", () => {
  it("should should display NewProjectForm", () => {
    const wrapper = shallow(<ProjectSetup />);
    expect(wrapper.find("NewProjectForm")).toHaveLength(1);
  });

  it("should should display ProjectList", () => {
    const wrapper = shallow(<ProjectSetup />);
    expect(wrapper.find("ProjectList")).toHaveLength(1);
  });

  // TODO: Add tests for inputting into draftjs, investigation needed
});
