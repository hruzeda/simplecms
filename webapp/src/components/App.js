import React, { Component } from "react";
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import LoginForm from "./login/LoginForm";
import CustomDialog from "./CustomDialog";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //users: null,
      //user: localStorage.user ? JSON.parse(localStorage.user) : null,
      pages: null,
      banners: null,
      posts: null,
      loginDialogOpen: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount = () => {
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
  };

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
  }*/
  openLoginDialog = () => {
    this.setState({ loginDialogOpen: true });
  };

  closeLoginDialog = () => {
    this.setState({ loginDialogOpen: false });
  };

  login = user => {
    localStorage.user = JSON.stringify(user);
    this.setState({ user: user });
  };

  logout = () => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/users/logout")
      .then(response => {
        localStorage.user = null;
        this.setState({ user: null });
        this.loadUserList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderUserOrLoginButton = () => {
    if (this.state.user) {
      return (
        <div>
          <p className="App-intro">
            {this.state.user.name}({this.state.user.email})
          </p>
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="UserOrLoginButton">
          <IconButton onClick={this.openLoginDialog}>
            <SettingsIcon />
          </IconButton>
        </div>
      );
    }
  };

  renderLoginDialog = () => {
    return (
      <CustomDialog
        open={this.state.loginDialogOpen}
        title="Administrative Area"
        confirmText="Login"
        confirmHandle={this.login}
        closeHandle={this.closeLoginDialog}
      >
        <LoginForm url="http://localhost:3001/users/authenticate" />
      </CustomDialog>
    );
  };

  loadPages = () => {
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
  };

  loadBanners = () => {
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
  };

  loadPosts = () => {
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
  };

  renderPages = () => {
    const pages = this.state.pages ? this.state.pages : [];
    return pages.map(page => (
      <Button size="small" key={page._id}>
        {page.title}
      </Button>
    ));
  };

  renderBanners = () => {
    const banners = this.state.banners ? this.state.banners : [];
    return banners.map(banner => (
      <Paper className="featuredPost" key={banner._id}>
        <img src={"img/upload/" + banner._id + ".jpg"} alt="banner" />
      </Paper>
    ));
  };

  renderPosts = () => {
    const posts = this.state.posts ? this.state.posts : [];
    return posts.map(post => (
      <Card className="post" key={post._id}>
        <div className="postDetails">
          <CardContent>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {post._id.generation_time}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.content}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className="postMedia"
            image={"img/upload/thumb/" + post._id + ".jpg"}
            title={post.title}
          />
        </Hidden>
      </Card>
    ));
  };

  render = () => {
    return (
      <div>
        {this.renderLoginDialog()}

        <div className="app">
          <Toolbar className="navBar">
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className="appTitle"
            >
              SimpleCMS
            </Typography>
            {this.renderUserOrLoginButton()}
          </Toolbar>
          <Toolbar variant="dense" className="pagesBar">
            {this.renderPages()}
          </Toolbar>
          <main>
            <Slider className="banner">{this.renderBanners()}</Slider>
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
                    About
                  </Typography>
                  <Typography>
                    Lightweight CMS written in NodeJS with ReactJS and MongoDB.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </main>
          <footer className="footer">
            <Grid container spacing={40}>
              <Grid item x2={12} md={6}>
                <Typography variant="h6" align="center" gutterBottom>
                  Location
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="h6" align="center" gutterBottom>
                  Contact Us
                </Typography>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="E-mail"
                  fullWidth
                  autoComplete="email"
                />
                <TextField
                  required
                  id="message"
                  name="message"
                  label="Message"
                  fullWidth
                  autoComplete="msg"
                  multiline
                  rowsMax="5"
                />
                <Button
                  variant="contained"
                  onClick={this.handleNext}
                  className="button"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </footer>
        </div>
      </div>
    );
  };
}

export default App;
