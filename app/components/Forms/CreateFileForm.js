import React from "react";
import { Form, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import { Input } from "app/components/Basic";
import { required } from "./validators";

export const CreateFileForm = ({ handleSubmit, submitting, pristine }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="fileName"
      component={Input}
      label="File Name"
      validate={[required]}
      type="text"
      data-test-id="create-file-field"
    />
    <Button
      type="submit"
      size="sm"
      color="secondary"
      disabled={submitting || pristine}
      data-test-id="create-file-button"
    >
      Create
    </Button>
  </Form>
);

export default reduxForm({ form: "createfile" })(CreateFileForm);
