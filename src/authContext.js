import React, { PureComponent } from "react";
const { Provider, Consumer } = React.createContext();

const AuthContext = React.createContext({});

export const withAuthContext = (Component) => {
  return (props) => {
    return (
      <AuthContext.Consumer>
        {(contextProps) => {
          return (
            <Component
              {...props}
              // isLogin={isLogin}
              // currentUser={currentUser}
              // token={token}
              {...contextProps}
            />
          );
        }}
      </AuthContext.Consumer>
    );
  };
};

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
