import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

import styles from "./TitleBar.scss";

// True if on OSX
const darwin = process.platform === "darwin";

const Menu = props => {
  const { title } = props;
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
      <Nav className="ml-auto">
        <NavItem>
          <NavLink href="#">
            <i className="far fa-file" />
            &nbsp;Files
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <i className="fas fa-history" />
            &nbsp;History
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Menu;
