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
import {
  UPDATE_EDITOR_STATE,
  SET_VIEW_STATE,
  SET_EDIT_STATE
} from "app/actions/editor";
import updateHistory from "app/actions/history";

import { FileObject } from "app/git-abs/metadata/file-object";

import { showError } from "app/actions/error";

export class CheckpointCard extends React.Component {
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
      viewedCheckpoint,
      dispatch
    } = this.props;

    return (
      <Card
        style={{
          backgroundColor: viewedCheckpoint === commit ? "#E8E9EA" : "#FFF"
        }}
      >
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
                onClick={() => {
                  gitAbstractions
                    .switchToCurrentVersion(currentFile)
                    .then(() =>
                      gitAbstractions.switchVersion(currentFile, commit)
                    )
                    .then(fileData =>
                      dispatch({
                        type: UPDATE_EDITOR_STATE,
                        payload: EditorState.createWithContent(
                          convertFromRaw(fileData)
                        )
                      })
                    )
                    .then(() =>
                      dispatch({ type: SET_VIEW_STATE, payload: commit })
                    )
                    .catch(e => {
                      dispatch(showError(e.message));
                    });
                }}
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
                    .then(() => dispatch({ type: SET_EDIT_STATE }))
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
                    .catch(err => {
                      console.error("Reset Failed: ", err);
                      dispatch(showError(err.message));
                    });
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
  checkpointHistory,
  editor: { viewedCheckpoint }
}) => ({
  gitAbstractions,
  currentFile,
  checkpointHistory,
  viewedCheckpoint
});

export default connect(mapStateToProps)(CheckpointCard);
