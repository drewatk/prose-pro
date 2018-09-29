import React from "react";
import { Button } from "reactstrap";

const ButtonWrapper = ({ text, disabled, ...props }) => (
  <div {...props}>
    <Button size="sm" color="secondary" disabled={disabled}>
      {text}
    </Button>
  </div>
);

export default ButtonWrapper;
