const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {    
    UserPoolId : process.env.awsCognitoPoolId, // Your user pool id here    
    ClientId : process.env.awsCognitoAppClientNoddyAuthClientId // Your client id here
};

const poolRegion = process.env.awsCognitoPoolRegion;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const himeshRefreshToken = '';

function RegisterUserHimesh(){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute( { Name:"name", Value:"Himesh" } ));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute( { Name:"email", Value:"himesh@ramjee.co.za" } ));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute( { Name:"custom:scope", Value:"admin" } ));

    userPool.signUp('himesh@ramjee.co.za', 'P@ssw0rd017', attributeList, null, function(err, result){
        if (err) {
            console.log("Failed to register user...");
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('User name is ' + cognitoUser.getUsername());
    });
}

function LoginHimesh() {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : 'himesh@ramjee.co.za',
        Password : 'P@ssw0rd017',
    });

    var userData = {
        Username : 'himesh@ramjee.co.za',
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    console.log("Authenticating user...");

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            himeshRefreshToken = result.getRefreshToken().getToken();
            console.log('\tAccess token + ' + result.getAccessToken().getJwtToken());
            console.log('\tId token + ' + result.getIdToken().getJwtToken());
            console.log('\tRefresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function(err) {
            console.log("Failed to login user...");
            console.log(err);
        },
    });
}

function updateHimesh(username, password){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "custom:scope",
        Value: "guest"
    }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "name",
        Value: "Himz"
    }));

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: 'himesh@ramjee.co.za',
        Password: 'P@ssw0rd017',
    });

    var userData = {
        Username: 'himesh@ramjee.co.za',
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
            console.log("Failed to update user...");
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

function ValidateToken(token) {
    request({
        url: `https://cognito-idp.${poolRegion}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for(var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent};
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            //validate the token
            var decodedJwt = jwt.decode(token, {complete: true});
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                return;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                return;
            }

            jwt.verify(token, pem, function(err, payload) {
                if(err) {
                    console.log("Invalid Token.");
                } else {
                    console.log("Valid Token.");
                    console.log(payload);
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
        }
    });
}

function renew() {
    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: himeshRefreshToken});

    var userData = {
        Username: 'himesh@ramjee.co.za',
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
        if (err) {
            console.log("Failed to renew user access token...");
            console.log(err);
        } else {
            himeshRefreshToken = session.refreshToken.token;
            let retObj = {
                "access_token": session.accessToken.jwtToken,
                "id_token": session.idToken.jwtToken,
                "refresh_token": session.refreshToken.token,
            }
            console.log(retObj);
        }
    })
}

function deleteAttributes(username, password){
    var attributeList = [];
    attributeList.push("custom:scope");

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: 'himesh@ramjee.co.za',
        Password: 'P@ssw0rd017',
    });

    var userData = {
        Username: 'himesh@ramjee.co.za',
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.deleteAttributes(attributeList, (err, result) => {
        if (err) {
            console.log("Failed to delete attributes...");
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

function ChangePassword(username, password, newpassword) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: 'himesh@ramjee.co.za',
        Password: 'P@ssw0rd017',
    });

    var userData = {
        Username: 'himesh@ramjee.co.za',
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.changePassword(password, newpassword, (err, result) => {
                if (err) {
                    console.log("Failed to change password...");
                    console.log(err);
                } else {
                    console.log("Successfully changed password of the user.");
                    console.log(result);
                }
            });
        },
        onFailure: function (err) {
            console.log(err);
        },
    });
}

function DeleteUser() {
    
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: 'himesh@ramjee.co.za',
        Password: 'P@ssw0rd017',
    });

    var userData = {
        Username: 'himesh@ramjee.co.za',
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.deleteUser((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully deleted the user.");
                    console.log(result);
                }
            });
        },
        onFailure: function (err) {
            console.log(err);
        },
    });
}