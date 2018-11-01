import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Input from "app/components/Basic/Input";

Enzyme.configure({ adapter: new Adapter() });

describe("Input", () => {
  it("matches snapshot", () => {
    const props = {
      input: {},
      type: "text",
      meta: { touched: false, error: false },
      label: "label"
    };

    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches snapshot (with error)", () => {
    const props = {
      input: {},
      type: "text",
      meta: { touched: true, error: true },
      label: "label"
    };

    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
