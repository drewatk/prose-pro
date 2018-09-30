import React from "react";
import { connect } from "react-redux";

import CheckpointView from "./CheckpointView";

const History = ({ history }) => (
  <div style={{ height: "100%" }}>
    {history.map((data, index) => (
      <CheckpointView key={index} {...data} />
    ))}
  </div>
);

const mapStateToProps = ({ checkpointHistory }) => ({
  history: checkpointHistory
});

export default connect(mapStateToProps)(History);
