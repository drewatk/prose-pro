import React from 'react';

const Input = ({ input: { value, onChange }, ...props }) => (
  <input type="text" value={value} onChange={onChange} {...props} />
);

export default Input;
