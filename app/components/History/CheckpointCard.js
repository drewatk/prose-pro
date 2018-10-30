import React from "react";
import { connect } from "react-redux";
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

import { EditorState, convertFromRaw } from "draft-js";
import { UPDATE_EDITOR_STATE } from "app/actions/editor";
import updateHistory from "app/actions/history";

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
    const {
      message,
      date,
      commitHash,
      gitAbstractions,
      currentFile,
      dispatch
    } = this.props;
    console.log("getting gitAbs = ", gitAbstractions);
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
              <DropdownItem
                onClick={() => console.log("IMPLEMENT CHECKPOINT VIEW")}
              >
                View
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  gitAbstractions
                    .reset(currentFile, commitHash)
                    .then(fileData =>
                      dispatch({
                        type: UPDATE_EDITOR_STATE,
                        payload: EditorState.createWithContent(
                          convertFromRaw(fileData)
                        )
                      })
                    )
                    //.then(() => /* write to versions file... */)
                    .then(() => gitAbstractions.getVersions(currentFile))
                    .then(({ versions }) => dispatch(updateHistory(versions)))
                    .catch(err => console.log("reset failed...", err));
                }}
              >
                Revert
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = ({ gitAbstractions, currentFile }) => ({
  gitAbstractions,
  currentFile
});

export default connect(mapStateToProps)(CheckpointCard);
