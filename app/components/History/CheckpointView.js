import React from "react";
import { Card, CardBody, CardSubtitle, CardText } from "reactstrap";

const CheckpointView = ({ message, date }) => (
  <Card>
    <CardBody>
      <CardSubtitle>Checkpoint:</CardSubtitle>
      <CardText>{message}</CardText>
      <CardSubtitle>Date:</CardSubtitle>
      <CardText>{date}</CardText>
    </CardBody>
  </Card>
);

export default CheckpointView;
