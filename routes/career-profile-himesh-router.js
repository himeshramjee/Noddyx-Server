var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("career-profile-himesh");
});

module.exports = router;
