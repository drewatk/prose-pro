import React from "react";
import { Card, CardBody, CardSubtitle, CardText } from "reactstrap";

const CheckpointCard = ({ message, date }) => (
  <Card>
    <CardBody>
      <CardSubtitle>Checkpoint:</CardSubtitle>
      <CardText>{message}</CardText>
      <CardSubtitle>Date:</CardSubtitle>
      <CardText>
        {new Date(date).toLocaleString("en-US", {
          timeZone: "America/New_York"
        })}
      </CardText>
    </CardBody>
  </Card>
);

export default CheckpointCard;
