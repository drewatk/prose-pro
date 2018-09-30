import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

const inputStyles = {
  error: {
    fontSize: "15px",
    fontFamily: "sans-serif",
    color: "#ad1e1a"
  }
};

const InputWrapper = ({ input, type, meta: { touched, error }, ...props }) => (
  <div {...props}>
    <InputGroup size="sm">
      <InputGroupAddon addonType="prepend">Message</InputGroupAddon>
      <Input type={type} {...input} />
    </InputGroup>
    {touched && error && <span style={inputStyles.error}>{error}</span>}
  </div>
);

export default InputWrapper;
