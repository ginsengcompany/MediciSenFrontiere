var express = require('express');
var router = express.Router();

var inserisciPaziente = require('../controllers/inserisciPazienteController');

router.post('/',function (req, res, next) {
    var datiAnagraficaPaziente = req.body;
    var queryPostAnagrafica = "INSERT INTO tb_anagrafica " +
        "(nome, cognome, anni, sesso, peso, villaggio, distretto, contea, madre, padre, telefono, malaria, malaria_inizio, malaria_fine)" +
        "VALUES (" +
        datiAnagraficaPaziente.nome            +", " +
        datiAnagraficaPaziente.cognome         +", " +
        datiAnagraficaPaziente.anni            +", " +
        datiAnagraficaPaziente.sesso           +", " +
        datiAnagraficaPaziente.peso            +", " +
        datiAnagraficaPaziente.villaggio       +", " +
        datiAnagraficaPaziente.distretto       +", " +
        datiAnagraficaPaziente.contea          +", " +
        datiAnagraficaPaziente.madre           +", " +
        datiAnagraficaPaziente.padre           +", " +
        datiAnagraficaPaziente.telefono        +", " +
        datiAnagraficaPaziente.malaria         +", " +
        datiAnagraficaPaziente.malaria_inizio  +", " +
        datiAnagraficaPaziente.malaria_fine    +")";


    inserisciPaziente.postAnagrafica(queryPostAnagrafica,function (err, res) {

    })
});

module.exports = router;