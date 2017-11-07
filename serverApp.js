var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');
var now = require('moment');

//var proxy = new httpProxy.RoutingProxy();

var postgres = require("./config/postgres");

var routes = require('./routes/index');
var user = require('./routes/user');
var dati = require('./routes/dati');
var database = require('./routes/database');
var informazioni = require('./routes/informazioni');
var intervento = require('./routes/intervento');

var app = express();

var con = postgres(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//
//app.all('/server/*', function (req, res) {
//
//    var forwardPath = '/';
//    req.url = forwardPath + req.url.split('/').slice(2).join('/'); // rimuove '/webhospital/';
//    var proxyOptions = {host: 'localhost', port: 3009};
//    return proxy.proxyRequest(req, res, proxyOptions);
//});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', routes);
app.use('/user', user);
app.use('/dati', dati);
app.use('/database', database);
app.use('/informazioni', informazioni);
app.use('/intervento', intervento);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;