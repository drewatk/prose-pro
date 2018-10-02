import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CheckpointForm } from "app/components/Forms/CheckpointForm";

Enzyme.configure({ adapter: new Adapter() });

describe("Checkpoint Creation Form", () => {
  it("should should display CheckpointForm", () => {
    const wrapper = shallow(
      <CheckpointForm
        handleSubmit={() => {}}
        pristine={true}
        submitting={false}
      />
    );
    expect(wrapper.find("Form")).toHaveLength(1);
  });

  // TODO: Add tests for input manipulation once redux connected to testing.
});
