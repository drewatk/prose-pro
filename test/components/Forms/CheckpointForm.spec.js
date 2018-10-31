import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CheckpointForm } from "app/components/Forms/CheckpointForm";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { reduxForm } from "redux-form";

Enzyme.configure({ adapter: new Adapter() });

describe("Checkpoint Creation Form", () => {
  it("should display CheckpointForm", () => {
    const wrapper = shallow(
      <CheckpointForm
        handleSubmit={() => {}}
        pristine={true}
        submitting={false}
      />
    );
    expect(wrapper.find("Form")).toHaveLength(1);
  });

  it("should add a checkpoint message and submit", () => {
    const store = createStore(state => state, { form: {} });
    const ReduxCheckpointForm = reduxForm({ form: "checkpoint" })(
      CheckpointForm
    );
    const wrapper = mount(
      <Provider store={store}>
        <ReduxCheckpointForm
          handleSubmit={() => {}}
          pristine={true}
          submitting={false}
        />
      </Provider>
    );

    expect(wrapper.find("Form")).toHaveLength(1);
    expect(wrapper.find("Input")).toHaveLength(1);
    wrapper.find("Input").simulate("change", { target: { value: "foo" } });
    console.log(store.getState());
    expect(wrapper.find("button")).toHaveLength(1);
    wrapper.find("button").simulate("click");
  });

  // TODO: Add tests for input manipulation once redux connected to testing.
});
