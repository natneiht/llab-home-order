import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import { userLogin, getOldSession, userGetProfile, getShippingRates } from "./functions";
import HomePage from "./containers/HomePage";
import ManageOrders from "./containers/ManageOrders";
import Login from "./containers/Login";
import ManageSetting from "./containers/ManageSetting";
import {AuthProvider} from './authContext'

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkingLoginStatus: true,
      isLogin: false,
      guestToken: null,
      userToken: null,
      userDetail: null,
      shippingRate: []
    };
  }


 componentDidMount = async () => {
   const oldSession = await getOldSession();
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

   // Set interval for checking notifications
  // this.interval = setInterval(() => this.checkUserNotification(), 5000);

 }

 setLoginStatus = (isLogin, token, isError) => {
   this.setState({
    isLogin,
    userToken: token
  })
 }
 
 setUserDetail = (userDetail) => {
   this.setState ( {userDetail})
 }

 checkShippingRate = () => {
   getShippingRates(this.state.userToken).then( response =>
   this.setState({shippingRate: response}))
 }
// This function for getting user's profile and checking notifications
checkUserNotification = () => {
  const { isLogin, userToken } = this.state
  if(isLogin) {
    userGetProfile(userToken).then(response => {
      if(response && response.hasOwnProperty('data')) {
        const userInfo = response.data
        this.setUserDetail(userInfo)
      }
    }).catch( err => console.log(err))
  }
}

// componentWillUnmount() {
//   clearInterval(this.interval);
// }

  render() {
    const { isLogin, userDetail, userToken, shippingRate } = this.state;
    return (
        <AuthProvider
        value={{
          isLogin,
          userDetail,
          userToken,
          shippingRate,
          setLoginStatus: this.setLoginStatus,
          checkShippingRate: this.checkShippingRate,
          checkUserNotification: this.checkUserNotification
        }}
      >

      <BrowserRouter>
        <Switch>
          <Route exact path="/"
            component={() => <HomePage  />} />
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
              <Login />
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
      </AuthProvider>
    );
  }
}

export default App;
