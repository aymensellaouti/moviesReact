import React from "react";
import "./App.css";
import Movies from "./movies/movies.components";
import { Route, Switch, Redirect } from "react-router-dom";

import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import MoviesUpdate from "./components/movies-update";

function App() {
  return (
    <>
      <main role="main" className="container">
        <Navbar></Navbar>
        <div>
          <Switch>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/movies/:id" component={MoviesUpdate}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/rentals" component={Rentals}></Route>
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
