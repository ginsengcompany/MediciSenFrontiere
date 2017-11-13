var inserisciPazienteController = module.exports;

var model = require('../models/inserisciPazienteModel');

inserisciPazienteController.postAnagrafica = function (queryPostAnagrafica,callback) {
    model.postAnagrafica(queryPostAnagrafica,callback);
};


