import React from 'react';

const buttonStyles = {};

const Button = ({ text, ...props }) => (
  <button style={buttonStyles} {...props}>
    {text}
  </button>
);

export default Button;
