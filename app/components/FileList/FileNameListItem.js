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
    const { file, onFileItemClick, className, onFileDeleteClick } = this.props;
    return (
      <ListGroupItem
        id="file-item"
        onClick={() => onFileItemClick(file)}
        className={className}
        data-test-id="file-list-item"
      >
        <h6>{file}</h6>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <i
              className="fas fa-ellipsis-h"
              data-test-id="file-list-item-toggle"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={e => {
                e.stopPropagation();
                onFileDeleteClick(file);
              }}
              data-test-id="file-list-item-delete-button"
            >
              Delete File
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ListGroupItem>
    );
  }
}

export default FileNameListItem;
