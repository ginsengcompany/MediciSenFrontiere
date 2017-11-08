var postgresConnection = require('config/postgres');
var inserisciPazientiModel = module.exports;

inserisciPazientiModel.connectionPostgres = function () {
    return createConnectionPostgres.get();
};

inserisciPazientiModel.postAnagrafica = function () {

};