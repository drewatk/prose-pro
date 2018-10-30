import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";
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

import { FileObject } from "app/git-abs/metadata/file-object";

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
      version,
      timestamp,
      commit,
      gitAbstractions,
      currentFile,
      checkpointHistory,
      dispatch
    } = this.props;

    return (
      <Card>
        <CardBody>
          <CardSubtitle>Checkpoint:</CardSubtitle>
          <CardText>{version}</CardText>
          <CardSubtitle>Date:</CardSubtitle>
          <CardText>
            {new Date(timestamp).toLocaleString("en-US", {
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
                    .reset(currentFile, commit)
                    .then(fileData =>
                      dispatch({
                        type: UPDATE_EDITOR_STATE,
                        payload: EditorState.createWithContent(
                          convertFromRaw(fileData)
                        )
                      })
                    )
                    .then(() =>
                      gitAbstractions.updateVersions(
                        currentFile,
                        new FileObject({
                          versions: R.dropLastWhile(
                            cp => cp.commit !== commit,
                            checkpointHistory
                          )
                        })
                      )
                    )
                    .then(() => gitAbstractions.getVersions(currentFile))
                    .then(({ versions }) => dispatch(updateHistory(versions)))
                    .catch(err => console.err("Reset Failed: ", err));
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

const mapStateToProps = ({
  gitAbstractions,
  currentFile,
  checkpointHistory
}) => ({
  gitAbstractions,
  currentFile,
  checkpointHistory
});

export default connect(mapStateToProps)(CheckpointCard);
