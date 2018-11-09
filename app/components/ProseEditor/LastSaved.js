import React from "react";
import { connect } from "react-redux";

const LastSaved = ({ lastSaved }) => (
  <p>
    <em>
      Last Saved:&nbsp;
      {lastSaved && new Date(lastSaved).toLocaleString()}
    </em>
  </p>
);

const mapStateToProps = ({ lastSaved }) => ({ lastSaved });

export default connect(mapStateToProps)(LastSaved);
