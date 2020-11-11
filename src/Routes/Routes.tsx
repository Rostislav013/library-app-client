import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "../pages/About";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ShoppingCart from "../pages/ShoppingCart";
import EditBook from "../pages/EditBook";
import EditUser from "../pages/EditUser";
import FormikLogin from "../pages/FormikLogin";
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products/:id" component={Product} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/cart" component={ShoppingCart} />
    <Route exact path="/book/:id" component={EditBook} />
    <Route exact path="/users/:id" component={EditUser} />
    <Route exact path="/about" component={About} />
    <Route exact path="/formiklogin" component={FormikLogin} />
  </Switch>
);

export default Routes;
