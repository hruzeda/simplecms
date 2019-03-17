import React, { Component } from "react";
//import LoginForm from "./LoginForm";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/SettingsSharp";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //users: null,
      //user: localStorage.user ? JSON.parse(localStorage.user) : null,
      pages: null,
      banners: null,
      posts: null
    };
    //this.login = this.login.bind(this);
    //this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    /*if (this.state.user == null) {
      this.loadUsers();
    }*/
    if (this.state.pages == null) {
      this.loadPages();
    }
    if (this.state.banners == null) {
      this.loadBanners();
    }
    if (this.state.posts == null) {
      this.loadPosts();
    }
  }

  /*loadUsers() {
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
  }*/

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
    } else {
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

  loadPages() {
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

  loadBanners() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/banners")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            banners: response.data
          });
        } else
          this.setState({
            banners: []
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadPosts() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/posts")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            posts: response.data
          });
        } else
          this.setState({
            posts: []
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderPages() {
    const pages = this.state.pages ? this.state.pages : [];
    return pages.map(page => (
      <Button size="small" key={page._id}>
        {page.title}
      </Button>
    ));
  }

  renderBanners() {
    const banners = this.state.banners ? this.state.banners : [];
    return banners.map(banner => (
      <div key={banner._id}>
        <img src={"img/upload/" + banner._id + ".jpg"} alt="banner" />
      </div>
    ));
  }

  renderPosts() {
    const posts = this.state.posts ? this.state.posts : [];
    return posts.map(post => (
      <div key={post._id}>
        <img src={"img/upload/" + post._id + ".jpg"} alt="banner" />
      </div>
    ));
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
          {this.renderPages()}
        </Toolbar>
        <main>
          <Slider className="Banner">{this.renderBanners()}</Slider>
          <Grid container spacing={40} className="mainGrid">
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Posts
              </Typography>
              <Divider />
              {this.renderPosts()}
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} className="sidebarAboutBox">
                <Typography variant="h6" gutterBottom>
                  Sobre
                </Typography>
                <Typography>
                  CMS pequeno e simples escrito em NodeJS com ReactJS e MongoDB.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
      /*<footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>*/
    );
  }
}

export default App;
