import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import HeaderBlockComponent from "./Component/HeaderBlockComponent";
import Login from "./Component/Login";
import HomePage from "./Component/HomePage";
import SignUp from "./Component/SignUp";
import { useDispatch } from "react-redux";
import { authUser } from "./actions/userProfile";

function App({ history }) {
  // const dispatch = useDispatch();

  useEffect(() => {
    history.push("/login");
  }, []);

  // function setUser() {
  //   dispatch(authUser());
  // }

  return (
    <div className="App">
      <header className="App-header">
        <HeaderBlockComponent />
      </header>
      <main>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(App);
