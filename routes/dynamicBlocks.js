const router = require("express").Router();
const DynamicBlock = require("../model/DynamicBlock");

/* GET users listing. */
router.get("/", function(req, res, next) {
  DynamicBlock.find(
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
