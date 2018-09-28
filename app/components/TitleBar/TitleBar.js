import React from "react";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import routes from "app/constants/routes.json";
import { toggleShowHistory, toggleShowFileList } from "app/actions/view";
import styles from "./TitleBar.scss";

// True if on OSX
const darwin = process.platform === "darwin";

const TitleBar = props => {
  const { title, pathname, onFilesClick, onHistoryClick } = props;

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

      {pathname === routes.EDITOR && (
        <Nav className="ml-auto">
          <NavItem>
            <NavLink
              onClick={() => {
                onFilesClick();
              }}
              href="#"
            >
              <i className="far fa-file" />
              &nbsp;Files
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                onHistoryClick();
              }}
              href="#"
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
  pathname: state.router.location.pathname
});

const mapDispatchToProps = dispatch => {
  return {
    onFilesClick: () => dispatch(toggleShowFileList()),
    onHistoryClick: () => dispatch(toggleShowHistory())
  };
};

const WithTitleBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);

export default WithTitleBar;
