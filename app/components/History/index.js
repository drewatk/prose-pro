import React from "react";
import { connect } from "react-redux";

import CheckpointCard from "./CheckpointCard";

export const History = ({ history }) => (
  <div style={{ height: "100%" }}>
    {history.map((data, index) => (
      <CheckpointCard key={index} {...data} />
    ))}
  </div>
);

const mapStateToProps = ({ checkpointHistory }) => ({
  history: checkpointHistory
});

export default connect(mapStateToProps)(History);
