var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('about-himesh');
});

router.post('/downloads/himesh-resume', function(req, res, next) {
  console.log("TODO: Generate PDF Resume");
  
  res.status(200).json({ authResponse });
});

module.exports = router;