var util = require('util');

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('index');
    });

    app.get('/database', function (req, res, next) {
        res.render('database');
    });

    app.get('/dati', function (req, res, next) {
        res.render('dati');
    });

    app.get('/followup', function (req, res, next) {
        res.render('followup');
    });

    app.get('/fotointervento', function (req, res, next) {
        res.render('fotointervento');
    });

    app.get('/informazioni', function (req, res, next) {
        res.render('informazioni');
    });

    app.get('/inserimentoNuovaCartella', function (req, res, next) {
        res.render('inserimentoNuovaCartella');
    });

    app.get('/intervento', function (req, res, next) {
        res.render('intervento');
    });

    app.get('/user', function (req, res, next) {
        res.render('user');
    });

};