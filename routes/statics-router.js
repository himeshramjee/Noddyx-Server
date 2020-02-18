var express = require('express');
var app = express();
const path = require('path');

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
};

app.use(express.static(path.join(__dirname, 'public/favicon.ico'), options));
app.use(express.static(path.join(__dirname, 'public/css'), options));
app.use(express.static(path.join(__dirname, 'public/js'), options));
app.use(express.static(path.join(__dirname, 'public/img'), options));
// app.use(express.static(path.join(__dirname, 'public/views'), options));

// module.exports = app;