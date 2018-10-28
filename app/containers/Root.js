import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import Routes from "../Routes";
import ErrorModal from "app/components/ErrorModal";

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ErrorModal>
            <Routes />
          </ErrorModal>
        </ConnectedRouter>
      </Provider>
    );
  }
}
