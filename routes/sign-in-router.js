var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // console.log("\tSign-In Router GET...");
  // res.send("Sign-in...");
  res.render('sign-in', { title: 'Explore: Nginx & AWS Cognito' });
});

router.post('/', function(req, res, next) {
  // console.log("\tSign-In Router POST...");
  const authRequest = req.body;

  const authResponse = { 'uname':authRequest.uname, 'result':'Not Authorized', 'resultCode':0 };
  
  res.status(200).json({ authResponse });
});

module.exports = router;