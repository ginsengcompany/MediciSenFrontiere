var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

function replaceAll (search, replacement, string) {
    var target = string;
    return target.replace(new RegExp(search, 'g'), replacement);
}

router.post('/',function (req, res, next) {
    var datiAnagraficaPaziente = req.body;
    var dataInizio = datiAnagraficaPaziente.inizio.date;
    var dataFine = datiAnagraficaPaziente.fine.date;

    var dataIni = '';
    var dataFin = '';

    var queryPostAnagrafica = '';

    if(dataInizio !== undefined || dataFine !== undefined){
        dataIni = moment(dataInizio).format();

        dataFin = moment(dataFine).format();

        queryPostAnagrafica = "INSERT INTO medici_senza_frontiere.tb_anagrafica " +
            "(nome, cognome, sesso, villaggio, distretto, contea, madre, padre, telefono, malaria, malaria_inizio, malaria_fine,surgey_children, st_mary_hospital)" +
            "VALUES (" +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.nome)              +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.cognome)            +"', " +
            "'" + datiAnagraficaPaziente.sesso              +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.villaggio)          +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.distretto)         +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.contea)             +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.madre)              +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.padre)              +"', " +
            "'" + datiAnagraficaPaziente.telefono           +"', " +
            "'" + datiAnagraficaPaziente.malaria            +"', " +
            "'" + dataIni                                   +"', " +
            "'" + dataFin                                   +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.surgey_children)    +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.st_mary_hospital)   +"')";
    }
    else {

        queryPostAnagrafica = "INSERT INTO medici_senza_frontiere.tb_anagrafica " +
            "(nome, cognome, sesso, villaggio, distretto, contea, madre, padre, telefono, malaria, surgey_children, st_mary_hospital)" +
            "VALUES (" +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.nome)              +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.cognome)            +"', " +
            "'" + datiAnagraficaPaziente.sesso              +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.villaggio)          +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.distretto)         +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.contea)             +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.madre)              +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.padre)              +"', " +
            "'" + datiAnagraficaPaziente.telefono           +"', " +
            "'" + datiAnagraficaPaziente.malaria            +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.surgey_children)    +"', " +
            "'" + replaceAll("'", "`",datiAnagraficaPaziente.st_mary_hospital)   +"')";
    }

       var client = connectionPostgres();

       const query = client.query(queryPostAnagrafica);

       query.on("row", function (row, result) {
          result.addRow(row);
       });

       query.on("end", function (result) {
           var myOjb = JSON.stringify(result.rows, null, "    ");
           var final = JSON.parse(myOjb);
		   client.end();
           return res.json(final);
       });


});

module.exports = router;