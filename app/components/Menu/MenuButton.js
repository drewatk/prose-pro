import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

import styles from "./Menu.scss";

export default class MenuButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { name } = this.props;
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className={styles.menuDropdown}
      >
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          {name}
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem>Save</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
