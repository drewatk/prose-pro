import React from 'react';

const Input = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...props
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input type={type} {...input} {...props} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default Input;
