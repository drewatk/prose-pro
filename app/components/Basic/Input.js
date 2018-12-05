import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

import styles from "./Input.scss";

const InputWrapper = ({
  input,
  type,
  meta: { touched, error },
  label,
  placeholder,
  ...props
}) => (
  <div {...props}>
    <InputGroup size="sm">
      <InputGroupAddon addonType="prepend">{label}</InputGroupAddon>
      <Input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        {...input}
      />
    </InputGroup>
    {touched && error && <span className={styles.error}>{error}</span>}
  </div>
);

export default InputWrapper;
