const router = require("express").Router();
const body = require("express-validator/check").body;
const User = require("../model/User");

/* GET users listing. */
router.get("/", function(req, res, next) {
  User.find(
    {},
    null,
    {
      sort: {
        email: 1
      }
    },
    (err, list) => {
      if (err) res.send(err);
      res.send(list);
    }
  );
});

router.get("/logout", function(req, res, next) {
  req.session = null;
  res.send(true);
});

router.post("/authenticate", function(req, res, next) {
  if (req.session.user === true) {
    console.log("User already logged in");
    res.send(true);
  } else {
    body("password")
      .not()
      .isEmpty()
      .trim()
      .escape();

    User.authenticate(req.body.password, result => {
      if (result instanceof User) {
        req.session.user = true;
        res.send(true);
      } else res.send(result.message);
    });
  }
});

module.exports = router;
