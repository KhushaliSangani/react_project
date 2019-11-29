import React, { Component } from "react";
import axios from "axios";
import auth from "./auth";
//import Header from '../common/headers';
import { Link } from "react-router-dom";
class Contentstack extends Component {
  state = {};
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
      <div>
        <button style={{ float: "right" }} onClick={this.handleLogout}>
          Logout
        </button>
        {/* <Header/> */}
        <ul>
          <li>
            <Link to={"/contentstack/content_types"}>ContentTypes</Link>
          </li>
          <li>
            <Link to="/contentstack/assets?">Assets</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Contentstack;
