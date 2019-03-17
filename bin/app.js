const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const logger = require("morgan");
const mongoose = require("mongoose");
//const path = require("path");
const indexRouter = require("../routes");
const usersRouter = require("../routes/users");
const pagesRouter = require("../routes/pages");

const mongoDB = "mongodb://127.0.0.1/simplecms";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.15.4:3000"],
    methods: ["GET", "POST"],
    credentials: true // enable set cookie
  })
);
app.use(logger("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  session({
    secret: "nothx",
    name: "simplecms",
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: "/",
      secure: false,
      httpOnly: false
    }
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pages", pagesRouter);
//app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = {
  app,
  db
};
