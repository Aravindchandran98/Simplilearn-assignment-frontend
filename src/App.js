import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import HeaderBlockComponent from "./Component/HeaderBlockComponent";
import Login from "./Component/Login";
import HomePage from "./Component/HomePage";
import SignUp from "./Component/SignUp";
import { useSelector } from "react-redux";

function App({ history }) {
  const ProfileState = useSelector((state) => state.userProfile);
  useEffect(() => {
    history.push("/login");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <HeaderBlockComponent />
      </header>
      <main>
        <Switch>
          {ProfileState && ProfileState.isLoggedIn ? (
            <Route path="/" component={HomePage} />
          ) : (
            <Route path="/login" component={Login} />
          )}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(App);
