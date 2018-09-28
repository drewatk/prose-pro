import React from "react";
import styles from "./ProseEditor.css";

export default class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const { active, label } = this.props;
    return (
      <span
        className={`${styles.styleButton} ${active ? styles.activeButton : ""}`}
        onMouseDown={this.onToggle}
        role="button"
      >
        {label}
      </span>
    );
  }
}
