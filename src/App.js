import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import { logginAction } from "./functions";
import HomePage from "./containers/HomePage";
import ManageOrders from "./containers/ManageOrders";
import Login from "./containers/Login";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userDetail: null,
    };
  }

  doLoginAction = async (userName, password) => {
    const result = await logginAction(userName, password);
    this.setState({ isLogin: true, userDetail: result });

    // console.log(result);
  };

  // getLocalLoginStatus = () => {
  //   localStorage;
  // };
  render() {
    const { isLogin, userDetail } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/admin"
            component={() => <ManageOrders isLogin={isLogin} />}
          />
          <Route
            exact
            path="/login"
            component={() => (
              <Login
                isLogin={isLogin}
                userDetail={userDetail}
                doLoginAction={this.doLoginAction}
              />
            )}
          />
          <Route
            render={(props) => (
              <div className="container" style={{ marginTop: "200px" }}>
                <h3>
                  Nothing here... Back to <NavLink to="/">homepage.</NavLink>
                </h3>
              </div>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
