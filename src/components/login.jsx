import React, { Component } from "react";
import axios from "axios";
import auth from "./auth";
const URL = "/user-session";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usr_email: "",
      usr_password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  validate() {
    const errors = {};
    if (this.state.usr_email.trim() === "")
      errors.usr_email = "user email is required";
    if (this.state.usr_password.trim() === "")
      errors.usr_password = "user password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  }
  handleSubmit(event) {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    let obj = {
      user: {
        email: this.state.usr_email,
        password: this.state.usr_password
      }
    };
    axios
      .post(URL, obj)
      .then(res => {
        auth.login(() => {
          const authToken = res.data.user.authtoken;
          document.cookie = `auth =${authToken}`;
          this.props.history.push("/contentstack");
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <span style={{ color: "red" }}>{this.state.errors.usr_email}</span>
        <br />
        <span style={{ color: "red" }}>{this.state.errors.usr_password}</span>
        <label className="sr-only"></label>
        <input
          type="email"
          className="form-control"
          name="usr_email"
          placeholder="Email address"
          value={this.state.usr_email}
          onChange={this.handleChange}
        />

        <label className="sr-only"></label>
        <input
          type="password"
          className="form-control"
          name="usr_password"
          placeholder="Password"
          value={this.state.usr_password}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary">Login</button>
      </form>
    );
  }
}

export default Login;
