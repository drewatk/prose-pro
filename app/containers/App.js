import React from "react";

const App = props => {
  const { children } = props;
  return <React.Fragment>{children}</React.Fragment>;
};

App.displayName = App;

export default App;
