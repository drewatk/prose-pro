/**
 * DISABLED TEST FILE
 */

import React from "react";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import { platform } from "os";
import routes from "app/constants/routes.json";
import { toggleShowHistory, toggleShowFileList } from "app/actions/view";
import { push } from "connected-react-router";
import styles from "./TitleBar.scss";
import { deSelectFile } from "app/actions/file_selection";
import { deSelectProject } from "app/actions/project_selection";

// True if on OSX
const darwin = platform() === "darwin";

export const TitleBar = props => {
  const {
    title,
    pathname,
    onFilesClick,
    onHistoryClick,
    onBackClick,
    currentFile,
    currentProject
  } = props;

  return (
    <div
      className={`${styles.titleBar} ${
        darwin ? styles.titleBarDarwin : ""
      } d-flex`}
    >
      {/* Insert a placeholder to offset for the buttons if we're on OSX */}
      <span className={styles.titleBarDarwinButtonsPlaceholder} />

      <h1 className={styles.titleBarHeader}>
        ProsePro
        <small className="text-muted">{title}</small>
      </h1>

      <h5 className={styles.names}>
        {currentProject}
        {currentFile ? ` : ${currentFile}` : ""}
      </h5>

      {pathname === routes.EDITOR && (
        <Nav>
          <NavItem>
            <NavLink
              id="back-button"
              onClick={() => {
                onBackClick();
              }}
              href="#"
              data-test-id="title-bar-back"
            >
              <i className="fas fa-arrow-left" />
              &nbsp;Back
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="files-button"
              onClick={() => {
                onFilesClick();
              }}
              href="#"
              data-test-id="title-bar-files"
            >
              <i className="far fa-file" />
              &nbsp;Files
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="history-button"
              onClick={() => {
                onHistoryClick();
              }}
              href="#"
              data-test-id="title-bar-history"
            >
              <i className="fas fa-history" />
              &nbsp;History
            </NavLink>
          </NavItem>
        </Nav>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  currentFile: state.currentFile,
  currentProject: state.currentProject
});

const mapDispatchToProps = dispatch => {
  return {
    onFilesClick: () => dispatch(toggleShowFileList()),
    onHistoryClick: () => dispatch(toggleShowHistory()),
    onBackClick: () => {
      dispatch([deSelectFile(), deSelectProject(), push(routes.PROJECT_SETUP)]);
    }
  };
};

const WithTitleBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);

export default WithTitleBar;
