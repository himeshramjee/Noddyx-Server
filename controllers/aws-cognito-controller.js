const authService = require('../services/aws-cognito-service');

exports.register = function(req, res){
    let register = authService.RegisterUser(req.body, function(err, result){
    if (err) {
        res.send(err);
    } else {
        res.send(result);
    }
  })
}

exports.login = function(req, res){
    let login = authService.Login(req.body, function(err, result){
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