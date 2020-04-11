import React, { useEffect } from "react";
import "./App.css";
import Movies from "./components/movies/movies.components";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import LoginForm from "./components/loginForm";
import Register from "./components/register";
import MovieForm from "./components/movies/movie-form";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  useEffect(() => {
    /*     const fetchData = async () => {
      const result = await http.get(config.apiEndpoint);
      console.log(result.data);
      handlePost();
    };
    fetchData();
 */
  }, []);
  /*   const handlePost = async () => {
    const result = await http.post(config.apiEndpoint, { a: "1", b: "2" });
    console.log(result.data);
  }; */
  return (
    <>
      <main role="main" className="container">
        <Navbar></Navbar>
        <ToastContainer></ToastContainer>
        <div>
          <Switch>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/register" component={Register}></Route>
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
