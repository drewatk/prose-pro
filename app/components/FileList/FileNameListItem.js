import React from "react";
import {
  ListGroupItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

class FileNameListItem extends React.Component {
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
    const { file, onFileItemClick, styles } = this.props;
    return (
      <ListGroupItem
        id="file-item"
        onClick={() => onFileItemClick(file)}
        style={styles}
      >
        {file}
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle tag="span">
            <i className="fas fa-ellipsis-h" style={{ float: "right" }} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Delete File</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ListGroupItem>
    );
  }
}

export default FileNameListItem;
