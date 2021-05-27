import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers/userProfile";
import { createStore, applyMiddleware, compose } from "redux";
import rtrRenderer from "react-test-renderer";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";

function render(
  ui,
  {
    initialState = {
      userProfile: {
        isLoggedIn: false,
      },
    },
    store = createStore(reducers, compose(applyMiddleware(thunk))),
    ...renderOptions
  } = {}
) {
  const Wrapper = function ({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const renderer = {};

renderer.create = function (
  ui,
  {
    initialState = {
      isLoggedIn: false,
    },
    store = createStore(reducers, compose(applyMiddleware(thunk))),
  } = {}
) {
  const Wrapper = function ({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  };
  return rtrRenderer.create(
    <Wrapper>
      <ui />
    </Wrapper>
  );
};

export * from "@testing-library/react";

// override render method
export { render, renderer };
