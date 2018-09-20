import React from 'react';

const inputStyles = {
  error: {
    color: 'red',
    fontSize: 10
  },
  inputWrapper: {
    display: 'block'
  }
};

const Input = ({ input, type, meta: { touched, error }, ...props }) => (
  <div {...props}>
    <div style={inputStyles.inputWrapper}>
      <input type={type} {...input} />
    </div>
    {touched && error && <span style={inputStyles.error}>{error}</span>}
  </div>
);

export default Input;
