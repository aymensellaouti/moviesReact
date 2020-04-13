import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ render, component: Component, ...otherProps }) => {
  console.log("protected Route otherProps", otherProps);
  const currentUser = getCurrentUser();
  return (
    <Route
      {...otherProps}
      render={(props) => {
        if (!currentUser)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            ></Redirect>
          );
        if (Component) return <Component {...props}></Component>;
        else return render(...props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
