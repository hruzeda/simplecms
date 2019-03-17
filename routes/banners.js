const router = require("express").Router();
const Banner = require("../model/Banner");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Banner.find(
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
