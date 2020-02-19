var express = require('express');
var router = express.Router();
var authController = require('../controllers/aws-cognito-controller');

router.get('/', function(req, res) {
    res.render('authenticate');
});

router.post('/register', authController.registerHimesh);
router.post('/login', authController.loginHimesh);
router.post('/validate', authController.validate_token);

module.exports = router;