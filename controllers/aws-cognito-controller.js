const authService = require('../services/aws-cognito-service');

exports.registerHimesh = function(req, res){
    let register = authService.RegisterUserHimesh(req.body, function(err, result){
    if (err) {
        res.send(err);
    } else {
        res.send(result);
    }
  })
}

exports.loginHimesh = function(req, res){
    let login = authService.LoginHimesh(req.body, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
}

exports.validate_token = function(req, res){
    let validate = authService.ValidateToken(req.body.token,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
}