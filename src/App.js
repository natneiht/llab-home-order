import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import { userLogin, getOldSession } from "./functions";
import HomePage from "./containers/HomePage";
import ManageOrders from "./containers/ManageOrders";
import Login from "./containers/Login";
import ManageSetting from "./containers/ManageSetting";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkingLoginStatus: true,
      isLogin: false,
      guestToken: null,
      userToken: null,
      userDetail: null,
    };
  }


 async componentDidMount() {
   const oldSession = await getOldSession();
  //  console.log(oldSession)
   if(oldSession){
     this.setState({
       checkingLoginStatus: false,
       isLogin: true,
       userToken: oldSession
     })
   }
   else {
     this.setState({
       checkingLoginStatus: false,
       isLogin: false,
       userToken: null
     })
   }
 }

 setLoginStatus (isLogin, token, isError) {
   this.setState({
    isLogin,
    userToken: token
  })
 }
 
 setUserDetail (userDetail) {
   this.setState ( {userDetail})
 }

  render() {
    const { isLogin, userDetail, userToken } = this.state;
    // console.log(this.state)
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"
            component={() => <HomePage isLogin={isLogin} token={userToken} userDetail={userDetail} setUserDetail={this.setUserDetail} />} />
          {/* <Route
            exact
            path="/admin"
            component={() => <ManageOrders isLogin={isLogin} />}
          /> */}
          {/* <Route
            exact
            path="/setting"
            component={() => <ManageSetting isLogin={isLogin} />}
          /> */}

          <Route
            exact
            path="/login"
            component={() => (
              <Login
                isLogin = {isLogin}
                setLoginStatus={this.setLoginStatus}
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
