import React from "react";
import MenuButton from "./MenuButton";

import styles from "./Menu.scss";

const darwin = process.platform === "darwin";

const Menu = () => {
  return (
    <div className={`${styles.menu} ${darwin ? styles.menuDarwin : ""}`}>
      <span className={styles.menuDarwinButtonsPlaceholder} />
      <h1 className={styles.menuHeader}>ProsePro</h1>
      <MenuButton name="File" />
    </div>
  );
};

export default Menu;
