var express = require('express');
var router = express.Router();

const dateFormat = require('dateFormat');

// TODO: Check out Morgan and actually use it. At the least these should be logged to separate application log file.
// BUG: Sometimes this seems to only be running for the favicon request :|
router.use(function (req, res, next) {
  console.log('Global Router: Request Timestamp: %s', dateFormat("isoUtcDateTime"));
  console.log('\tGlobal Router: Request Caller IP (of client or proxy): %s', req.ip);
  console.log('\tGlobal Router: Request Caller IPs (of client or proxy): %s', req.ips);
  console.log('\tGlobal Router: Request Protocol: %s', req.protocol);
  console.log('\tGlobal Router: Request Method: %s', req.method);
  console.log('\tGlobal Router: Request URL: %s', req.originalUrl);
  console.log('\tGlobal Router: Request Path: %s', req.path);
  console.log('\tGlobal Router: Request-Headers Host: %s', req.get('host'));
  console.log('Global Router: Request-Headers User Agent: %s', req.get('user-agent'));
  next();
});

// TODO: Authenticate caller
router.all("*", function(req, res, next) {
  console.log('Global Router: TODO: Generate Request ID');
  console.log('Global Router: TODO: Authenticate caller');
  next();
});

// CORS enable
/*
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}
*/

// module.exports = router;