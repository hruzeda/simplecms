import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  emailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  passwordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  onSubmit(event) {
    axios.defaults.withCredentials = true;
    axios
      .post(this.props.url, {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (typeof response.data === "string") {
          alert(response.data);
        } else {
          this.props.onSuccess(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form className="LoginForm" onSubmit={this.onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={this.state.email}
          onChange={this.emailChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.passwordChange}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;
