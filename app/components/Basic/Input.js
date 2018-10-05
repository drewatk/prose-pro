import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

import styles from "./Input.css";

const InputWrapper = ({ input, type, meta: { touched, error }, ...props }) => (
  <div {...props}>
    <InputGroup size="sm">
      <InputGroupAddon addonType="prepend">Message</InputGroupAddon>
      <Input type={type} {...input} />
    </InputGroup>
    {touched && error && <span className={styles.error}>{error}</span>}
  </div>
);

export default InputWrapper;
