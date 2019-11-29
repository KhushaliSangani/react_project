import React, { Component } from 'react';
import axios from "axios";
import auth from "../components/auth";
class Header extends Component {
    state = {  }
    handleLogout = () => {
        const logoutInstance = axios.create({
          baseURL: `/user-session`,
          headers: {
            authtoken: document.cookie.split("=")[1]
          }
        });
        logoutInstance.delete().then(res => {
          console.log(res);
          auth.logout(() => {
            document.cookie = "auth=";
            this.props.history.push("/login");
          });
        });
      };
    render() { 
        return ( 
        <button style={{ float: "right" }} onClick={this.handleLogout}>
          Logout
        </button>
         );
    }
}
 
export default Header;