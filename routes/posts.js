const router = require("express").Router();
const Post = require("../model/Post");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Post.find(
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
