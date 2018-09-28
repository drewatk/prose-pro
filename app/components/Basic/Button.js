import React from "react";
import { Button } from "reactstrap";

const ButtonWrapper = ({ text, ...props }) => (
  <div {...props}>
    <Button size="sm" color="secondary">
      {text}
    </Button>
  </div>
);

export default ButtonWrapper;
