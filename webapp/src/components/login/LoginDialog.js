import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import CustomDialog from "../utils/CustomDialog";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: null
    };
  }

  passwordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  submitHandle = event => {
    this.setState({ error: null });
    axios.defaults.withCredentials = true;
    axios
      .post(this.props.url, {
        password: this.state.password
      })
      .then(response => {
        debugger;
        if (typeof response.data === "boolean") {
          this.props.closeHandle();
          this.props.callback();
        } else {
          this.setState({ error: response.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  };

  closeHandle = () => {
    this.setState({ error: null });
    this.props.closeHandle();
  };

  renderErrorMessage = () => {
    if (this.state.error !== null) {
      return <Typography color="error">{this.state.error}</Typography>;
    }
  };

  render = () => {
    return (
      <CustomDialog
        open={this.props.open}
        title="Administrative Area"
        confirmText="Login"
        confirmHandle={this.submitHandle}
        closeHandle={this.closeHandle}
      >
        <form className="LoginForm">
          {this.renderErrorMessage()}
          <TextField
            margin="dense"
            id="password"
            type="password"
            label="Password"
            fullWidth
            value={this.state.password}
            onChange={this.passwordChange}
          />
        </form>
      </CustomDialog>
    );
  };
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  closeHandle: PropTypes.func.isRequired
};

export default LoginDialog;
