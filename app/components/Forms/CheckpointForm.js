import React from "react";
import { Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import { Button, Input } from "app/components/Basic";
import { required } from "./validators";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    borderWidth: "1px",
    borderColor: "#898989",
    borderStyle: "solid",
    borderRadius: "10px",
    justifyContent: "center",
    padding: "20px"
  },
  header: {
    color: "#595858"
  },
  button: {
    marginTop: "20px",
    width: "60px"
  }
};

const CheckpointForm = ({ handleSubmit, submitting, pristine }) => (
  <Form style={styles.form} onSubmit={handleSubmit}>
    <h4 style={styles.header}>Create Checkpoint</h4>
    <Field
      name="commitMessage"
      component={Input}
      validate={[required]}
      type="text"
    />
    <Button
      type="submit"
      text="Create"
      disabled={submitting || pristine}
      style={styles.button}
    />
  </Form>
);

export default reduxForm({ form: "checkpoint" })(CheckpointForm);
