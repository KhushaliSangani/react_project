import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({ component: Component }) => {
    return (
        <Route
        render={props=>{
            if(auth.isAuthenticated()){
                return <Component{...props}/>
            }else{
                return(
                <Redirect to ="/login"/>
             );
            }
        }}
      />
    );
};
