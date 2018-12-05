import React from "react";
import { connect } from "react-redux";

import CheckpointCard from "./CheckpointCard";

export const History = ({ history }) => (
  // TODO: Move styles to CSS file
  <div style={{ height: "100%" }} data-test-id="history-list">
    {history.reverse().map((data, index) => (
      <CheckpointCard key={index} {...data} />
    ))}
  </div>
);

const mapStateToProps = ({ checkpointHistory }) => ({
  history: checkpointHistory
});

export default connect(mapStateToProps)(History);
