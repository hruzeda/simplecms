import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import CssBaseline from "@material-ui/core/CssBaseline";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

registerServiceWorker();
