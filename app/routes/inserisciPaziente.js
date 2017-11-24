var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiAnagraficaPaziente = req.body;
    var dataInizio = datiAnagraficaPaziente.inizio.date;
    var dataIni = moment(dataInizio).format();
    var dataFine = datiAnagraficaPaziente.fine.date;
    var dataFin = moment(dataFine).format();
    var queryPostAnagrafica = "INSERT INTO medici_senza_frontiere.tb_anagrafica " +
        "(nome, cognome, anni, sesso, peso, villaggio, distretto, contea, madre, padre, telefono, malaria, malaria_inizio, malaria_fine,surgey_children,numero_cartella,cartella,st_mary_hospital,foto_paziente)" +
        "VALUES (" +
         "'" + datiAnagraficaPaziente.nome               +"', " +
         "'" + datiAnagraficaPaziente.cognome            +"', " +
         "'" + datiAnagraficaPaziente.anni               +"', " +
         "'" + datiAnagraficaPaziente.sesso              +"', " +
         "'" + datiAnagraficaPaziente.peso               +"', " +
         "'" + datiAnagraficaPaziente.villaggio          +"', " +
         "'" + datiAnagraficaPaziente.distretto          +"', " +
         "'" + datiAnagraficaPaziente.contea             +"', " +
         "'" + datiAnagraficaPaziente.madre              +"', " +
         "'" + datiAnagraficaPaziente.padre              +"', " +
         "'" + datiAnagraficaPaziente.telefono           +"', " +
         "'" + datiAnagraficaPaziente.malaria            +"', " +
         "'" + dataIni                                   +"', " +
         "'" + dataFin                                   +"', " +
         "'" + datiAnagraficaPaziente.surgey_children    +"', " +
         "'" + datiAnagraficaPaziente.numero_cartella    +"', " +
         "'" + datiAnagraficaPaziente.cartella           +"', " +
         "'" + datiAnagraficaPaziente.st_mary_hospital   +"', " +
         "'" + datiAnagraficaPaziente.foto_paziente      +"')";

       var client = connectionPostgres();

       const query = client.query(queryPostAnagrafica);

       query.on("row", function (row, result) {
          result.addRow(row);
       });

       query.on("end", function (result) {
           var myOjb = JSON.stringify(result.rows, null, "    ");
           var final = JSON.parse(myOjb);
           return res.json(final);
           client.end();
       });


});

module.exports = router;