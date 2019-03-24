import PropTypes from "prop-types";
import React, { Component } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

class CustomDialog extends Component {
  render = () => {
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="sm"
        //onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={this.props.open}
        onClose={this.props.closeHandle}
      >
        <DialogTitle id="confirmation-dialog-title">
          {this.props.title}
        </DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeHandle} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.confirmHandle} color="primary">
            {this.props.confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  closeHandle: PropTypes.func.isRequired,
  confirmHandle: PropTypes.func.isRequired,
  confirmText: PropTypes.string.isRequired
};

export default CustomDialog;
