import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const LAST_SAVED_DISPLAY_REFRESH_INTERVAL = 5000;

class LastSaved extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  static getDerivedStateFromProps(props) {
    return {
      text: `Last Saved ${moment(props.lastSaved).fromNow()}.`
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          text: `Last Saved ${moment(this.props.lastSaved).fromNow()}.`
        }),
      LAST_SAVED_DISPLAY_REFRESH_INTERVAL
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <p>
        <em>{this.state.text}</em>
      </p>
    );
  }
}

const mapStateToProps = ({ lastSaved }) => ({ lastSaved });

export default connect(mapStateToProps)(LastSaved);
