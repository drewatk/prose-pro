import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { EditorPanel } from "app/components/EditorPanel";

Enzyme.configure({ adapter: new Adapter() });

describe("EditorPanel", () => {
  it("matches snapshot (editable)", () => {
    const wrapper = shallow(<EditorPanel isEditable />);
    expect(wrapper).toMatchSnapshot;
  });

  it("matches snapshot (non-editable)", () => {
    const wrapper = shallow(<EditorPanel isEditable={false} />);
    expect(wrapper).toMatchSnapshot;
  });
});
