const router = require("express").Router();
const Page = require("../model/Page");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Page.find(
    {},
    null,
    {
      sort: {
        _id: -1
      }
    },
    (err, list) => {
      if (err) res.send(err);
      res.send(list);
    }
  );
});

module.exports = router;
