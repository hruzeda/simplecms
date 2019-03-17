import React, { Component } from "react";
//import LoginForm from "./LoginForm";
import axios from "axios";
import Slider from "react-slick";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/SettingsSharp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      user: localStorage.user ? JSON.parse(localStorage.user) : null,
      pages: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.state.user == null) {
      this.loadUserList();
    }
    if (this.state.pages == null) {
      this.loadPagesList();
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

  loadPagesList() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/pages")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            pages: response.data
          });
        } else
          this.setState({
            pages: []
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

  renderPagesList() {
    const pages = this.state.pages ? this.state.pages : [];
    return pages.map(page => (
      <Button size="small" key="page._id">
        {page.title}
      </Button>
    ));
  }

  renderUserOrLoginButton() {
    if (this.state.user) {
      return (
        <div>
          <p className="App-intro">
            {this.state.user.name}({this.state.user.email})
          </p>
          <button onClick={this.logout}> Logout </button>
        </div>
      );
    } else if (this.state.users) {
      return (
        <div className="UserOrLoginButton">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      );
      /*<LoginForm
        url="http://localhost:3001/users/authenticate"
        onSuccess={this.login}
      />*/
    }
  }

  render() {
    return (
      <div className="App">
        <Toolbar className="NavBar">
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className="AppTitle"
          >
            SimpleCMS
          </Typography>
          {this.renderUserOrLoginButton()}
        </Toolbar>
        <Toolbar variant="dense" className="PagesBar">
          {this.renderPagesList()}
        </Toolbar>
        <main>
          <Slider className="Banner">
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </main>
      </div>
    );
  }
}

export default App;
