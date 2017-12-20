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
var informazioni = require('./routes/informazioni');
var user = require('./routes/user');
var inserimentoNuovaCartella = require('./routes/inserimentoNuovaCartella');
var database = require('./routes/database');
var dati = require('./routes/dati');
var intervento = require('./routes/intervento');
var fotointervento = require('./routes/fotointervento');
var followup = require('./routes/followup');
var inserisciPaziente = require('./app/routes/inserisciPaziente');
var getPaziente = require('./app/routes/getPaziente');
var getNumeroCartella = require('./app/routes/getNumeroCartella');
var getDatiPazientePerCartella = require('./app/routes/getDatiPazientePerCartella');
var getDatiInterventoPerCartella = require('./app/routes/getDatiInterventoPerCartella');
var getCartellaPaziente = require('./app/routes/getCartellaPaziente');
var inserisciInformazioni = require('./app/routes/inserisciInformazioni');
var inserisciCartella = require('./app/routes/inserisciCartella');
var inserisciIntervento = require('./app/routes/inserisciIntervento');
var getIntervento = require('./app/routes/getIntervento');
var inserisciFoto = require('./app/routes/inserisciFoto');
var inserisciFollowUp = require('./app/routes/inserisciFollowUp');
var getBackup = require('./app/routes/getBackup');
var getInformazioni = require('./app/routes/getInformazioni');
var getFotoIntervento = require ('./app/routes/getFotoIntervento');

var app = express();
var con = postgres(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
app.use('/fotointervento',fotointervento);
app.use('/followup', followup);
app.use('/salvaAnagrafica',inserisciPaziente);
app.use('/getDatiPazientePerCartella',getDatiPazientePerCartella);
app.use('/getNumeroCartella',getNumeroCartella);
app.use('/getDatiInterventoPerCartella',getDatiInterventoPerCartella);
app.use('/getPaziente',getPaziente);
app.use('/getCartellaPaziente',getCartellaPaziente);
app.use('/salvaInformazioni',inserisciInformazioni);
app.use('/salvaCartella',inserisciCartella);
app.use('/salvaIntervento',inserisciIntervento);
app.use('/getIntervento',getIntervento);
app.use('/inserisciFoto',inserisciFoto);
app.use('/inserisciFollowUp',inserisciFollowUp);
app.use('/getBackup',getBackup);
app.use('/getInformazioni',getInformazioni);
app.use('/getFotoIntervento',getFotoIntervento);
app.use('/inserimentoNuovaCartella',inserimentoNuovaCartella);


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