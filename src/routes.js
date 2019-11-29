import React from 'react';
import { Route,Switch } from "react-router-dom";
import Login from "./components/login";
import Contentstack from "./components/contentstack";
import { ProtectedRoute } from "./components/protected.route";

const routes =(
    
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/contentstack" component={Contentstack} />
    
)
export default routes;