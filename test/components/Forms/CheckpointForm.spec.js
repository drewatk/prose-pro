import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CheckpointForm } from "app/components/Forms/CheckpointForm";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { reduxForm, reducer as formReducer } from "redux-form";

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
    const store = createStore(formReducer);
    const ReduxCheckpointForm = reduxForm({ form: "checkpoint" })(
      CheckpointForm
    );
    const wrapper = mount(
      <Provider store={store}>
        <ReduxCheckpointForm onSubmit={() => {}} />
      </Provider>
    );

    expect(wrapper.find("Form")).toHaveLength(1);
    expect(wrapper.find("Input")).toHaveLength(1);
    expect(wrapper.find("Button")).toHaveLength(1);

    const commitMessage = "Draft 1 Commit";
    wrapper
      .find("Input")
      .simulate("change", { target: { value: commitMessage } });
    expect(store.getState().checkpoint.values.commitMessage).toBe(
      commitMessage
    );
    wrapper.find("Button").simulate("click");
  });
});
