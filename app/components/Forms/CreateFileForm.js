import React from "react";
import { Form, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import { Input } from "app/components/Basic";
import { required } from "./validators";

export const CreateFileForm = ({ handleSubmit, submitting, pristine }) => (
  <Form onSubmit={handleSubmit}>
    <h4>New File</h4>
    <Field
      name="fileName"
      component={Input}
      validate={[required]}
      type="text"
    />
    <Button
      type="submit"
      size="sm"
      color="secondary"
      disabled={submitting || pristine}
    >
      Create
    </Button>
  </Form>
);

export default reduxForm({ form: "createfile" })(CreateFileForm);
