var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
    // console.log("\tIndex Router GET...");
    // res.sendFile(path.join(__dirname, '../public/index.html'));
    res.render('index');
});

module.exports = router;