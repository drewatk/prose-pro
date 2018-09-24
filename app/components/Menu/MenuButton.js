import React from "react";

import styles from "./Menu.scss";

const MenuButton = props => {
  return (
    <a role="button" className={styles.menuButton}>
      {props.name}
    </a>
  );
};

export default MenuButton;
