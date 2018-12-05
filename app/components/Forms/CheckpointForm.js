import React from "react";
import { Form, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import { Input } from "app/components/Basic";
import { required } from "./validators";

import styles from "./CheckpointForm.scss";

export const CheckpointForm = ({ handleSubmit, submitting, pristine }) => (
  <Form className={styles.form} onSubmit={handleSubmit}>
    <h4 className={styles.header}>Create Checkpoint</h4>
    <Field
      name="commitMessage"
      component={Input}
      label="Message"
      validate={[required]}
      type="text"
      data-test-id="create-checkpoint-field"
    />
    <Button
      type="submit"
      size="sm"
      color="secondary"
      disabled={submitting || pristine}
      className={styles.button}
      data-test-id="create-checkpoint-button"
    >
      Create
    </Button>
  </Form>
);

export default reduxForm({ form: "checkpoint" })(CheckpointForm);
