import React, { Component } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      user: localStorage.user ? JSON.parse(localStorage.user) : null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.state.user == null) {
      this.loadUserList();
    }
  }

  loadUserList() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/users")
      .then(response => {
        this.setState({
          users: JSON.stringify(response.data)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(user) {
    localStorage.user = JSON.stringify(user);
    this.setState({
      user: user
    });
  }

  logout() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/users/logout")
      .then(response => {
        localStorage.user = null;
        this.setState({
          user: null
        });
        this.loadUserList();
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderUserOrLoginForm() {
    if (this.state.user) {
      return (
        <div>
          <p className="App-intro">
            {" "}
            {this.state.user.name}({this.state.user.email}){" "}
          </p>{" "}
          <button onClick={this.logout}> Logout </button>{" "}
        </div>
      );
    } else if (this.state.users) {
      return (
        <div>
          <p className="App-intro"> {this.state.users} </p>{" "}
          <LoginForm
            url="http://localhost:3001/users/authenticate"
            onSuccess={this.login}
          />{" "}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Welcome to React </h1>{" "}
        </header>{" "}
        {this.renderUserOrLoginForm()}{" "}
      </div>
    );
  }
}

export default App;
