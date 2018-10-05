import React from "react";
import { Form, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import { Input } from "app/components/Basic";
import { required } from "./validators";

import styles from "./CheckpointForm.css";

export const CheckpointForm = ({ handleSubmit, submitting, pristine }) => (
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
      size="sm"
      color="secondary"
      disabled={submitting || pristine}
      style={styles.button}
    >
      Create
    </Button>
  </Form>
);

export default reduxForm({ form: "checkpoint" })(CheckpointForm);
