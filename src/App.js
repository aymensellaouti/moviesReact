import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies/movies.components";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import LoginForm from "./components/loginForm";
import Register from "./components/register";
import MovieForm from "./components/movies/movie-form";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./common/protectedRoute";

function App() {
  const [currentUser, seCurrentUser] = useState(null);
  useEffect(() => {
    const currentUser = getCurrentUser();
    seCurrentUser(currentUser);
  }, []);
  return (
    <>
      <main role="main" className="container">
        <Navbar currentUser={currentUser}></Navbar>
        <ToastContainer></ToastContainer>
        <div>
          <Switch>
            <Route path="/customers" component={Customers}></Route>
            <Route
              path="/login"
              render={(props) => {
                if (currentUser) return <Redirect to="/"></Redirect>;
                return <LoginForm {...props}></LoginForm>;
              }}
            ></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect exact from="/" to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
