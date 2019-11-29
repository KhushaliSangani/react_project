import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Contentstack from "./components/contentstack";
import { ProtectedRoute } from "./components/protected.route";
import ContentTypes from "./components/content_types";
import Assets from './components/assets';
//import Header from './common/headers';
function App(props) {
  
   
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/contentstack" component={Contentstack} />
          <ProtectedRoute 
            path="/contentstack/content_types"
            component={ContentTypes}
          />
          <ProtectedRoute exact
            path= "/contentstack/assets"
            component={Assets}
          />
           {/* <ProtectedRoute exact
            path= "/contentstack/assets?page="
            component={Assets}
          /> */}
        </Switch>
        

      </div>
      
    </Router>
  );
}

export default App;
