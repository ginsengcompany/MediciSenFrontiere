var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiIntervento = req.body;
    var dataInizio = datiIntervento.dataIntervento.date;
    var dataIni = moment(dataInizio).format();
	
	function replaceAll (search, replacement, string) {
        var target = string;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    var queryPostIntervento = "INSERT INTO medici_senza_frontiere.tb_intervento " +
        "(data_intervento, descrizione_intervento, foglio_diario_clinico, complicanze, id_cartella)" +
        "VALUES (" +
        "'" + dataIni                                 +"', " +
        "'" + replaceAll("'", "`",datiIntervento.descrizioneIntervento)   +"', " +
        "'" + replaceAll("'", "`",datiIntervento.foglioDiarioClinico)      +"', " +
        "'" + replaceAll("'", "`",datiIntervento.complicanze)             +"', " +
        "'" + datiIntervento.id_cartella                 +"')";

    var client = connectionPostgres();

    const query = client.query(queryPostIntervento);

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