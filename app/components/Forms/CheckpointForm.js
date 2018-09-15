import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button, Input } from '../Basic';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    width: '350px',
    backgroundColor: '#fff',
    borderWidth: '1px',
    borderColor: '#000',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  button: {
    marginTop: '20px',
    width: '60px'
  }
};

/*
  TODO: avoid relying on disablement of submit button to enforce validation
*/

const CheckpointForm = ({ handleSubmit, submitting, pristine }) => (
  <form style={styles.form} onSubmit={handleSubmit}>
    <h4>Create Checkpoint</h4>
    <Field name="commitMessage" component={Input} type="text" />
    <Button
      type="submit"
      text="Create"
      disabled={submitting || pristine}
      style={styles.button}
    />
  </form>
);

export default reduxForm({ form: 'checkpoint' })(CheckpointForm);
