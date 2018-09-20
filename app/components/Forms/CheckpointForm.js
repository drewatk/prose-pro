import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button, Input } from 'app/components/Basic';
import { required } from './validators';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '120px',
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

const CheckpointForm = ({ handleSubmit, submitting, pristine }) => (
  <form style={styles.form} onSubmit={handleSubmit}>
    <h4>Create Checkpoint</h4>
    <Field
      name="commitMessage"
      component={Input}
      validate={[required]}
      type="text"
    />
    <Button
      type="submit"
      text="Create"
      disabled={false && (submitting || pristine)}
      style={styles.button}
    />
  </form>
);

export default reduxForm({ form: 'checkpoint' })(CheckpointForm);
