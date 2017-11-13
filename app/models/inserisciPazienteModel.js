var postgresConnection = require('../../config/postgres');
var inserisciPazientiModel = module.exports;

inserisciPazientiModel.connectionPostgres = function () {
  return postgresConnection();
};

inserisciPazientiModel.postAnagrafica = function (queryPostAnagrafica,callback) {
    var query = inserisciPazientiModel.connectionPostgres();
    query.query(queryPostAnagrafica, function (err, query) {
        if (err){
            callback(err);
        }
        else{
            callback(err);
        }
    });
};