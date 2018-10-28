import React from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class CheckpointCard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { message, date } = this.props;
    return (
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
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle tag="span">
              <i className="fas fa-ellipsis-h" style={{ float: "right" }} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>View</DropdownItem>
              <DropdownItem>Revert</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
    );
  }
}

export default CheckpointCard;
