var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiInformazioniPaziente = req.body;
    var dataInizio = datiInformazioniPaziente.data_ricovero.date;
    var dataIni = moment(dataInizio).format();
    var dataFine = datiInformazioniPaziente.data_dimissione.date;
    var dataFin = moment(dataFine).format();

    var queryPostAnagrafica = "INSERT INTO medici_senza_frontiere.tb_informazioni_cliniche " +
        "(data_ricovero, data_dimissione, diagnosi, anamnesi, consulenza_chiurugica, consulenza_anestesiologica, id_paziente)" +
        "VALUES (" +
        "'" + dataIni                                              +"', " +
        "'" + dataFin                                              +"', " +
        "'" + datiInformazioniPaziente.diagnosi                    +"', " +
        "'" + datiInformazioniPaziente.anamnesi                    +"', " +
        "'" + datiInformazioniPaziente.consulenza_chiurugica       +"', " +
        "'" + datiInformazioniPaziente.consulenza_anestesiologica  +"', " +
        "'" + datiInformazioniPaziente.id_paziente                 +"')";

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