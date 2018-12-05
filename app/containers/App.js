import React from "react";
import { connect } from "react-redux";

const App = props => {
  const { children, theme } = props;

  return <div className={theme}>{children}</div>;
};

App.displayName = App;

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};

const withApp = connect(mapStateToProps)(App);
withApp.displayName = "App";

export default withApp;
