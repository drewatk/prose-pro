import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";

import CheckpointCard from "./CheckpointCard";

export const History = ({ history }) => (
  // TODO: Move styles to CSS file
  <div style={{ height: "100%" }}>
    {R.reverse(history).map((data, index) => (
      <CheckpointCard key={index} {...data} />
    ))}
  </div>
);

const mapStateToProps = ({ checkpointHistory }) => ({
  history: checkpointHistory
});

export default connect(mapStateToProps)(History);
