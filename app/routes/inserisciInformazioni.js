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
    var datiInformazioniPaziente = req.body;
    var dataInizio = datiInformazioniPaziente.data_ricovero.date;
    var dataFine = datiInformazioniPaziente.data_dimissione.date;

    var dataIni = '';
    var dataFin = '';

    var queryPostInformazioni = '';

    if(dataInizio !== undefined && dataFine !== undefined && dataInizio !== "" && dataFine !== ""){
        dataIni = moment(dataInizio).format();

        dataFin = moment(dataFine).format();

        queryPostInformazioni = "INSERT INTO medici_senza_frontiere.tb_informazioni_cliniche " +
            "(data_ricovero, data_dimissione, diagnosi, anamnesi, consulenza_chiurugica, consulenza_anestesiologica, id_cartella)" +
            "VALUES (" +
            "'" + dataIni                                              +"', " +
            "'" + dataFin                                              +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.diagnosi)                    +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.anamnesi)                    +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.consulenza_chiurugica)       +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.consulenza_anestesiologica)  +"', " +
            "'" + datiInformazioniPaziente.id_cartella                 +"')";


    }
    else if(dataInizio !== undefined || dataInizio !== ""){

        dataIni = moment(dataInizio).format();

        queryPostInformazioni = "INSERT INTO medici_senza_frontiere.tb_informazioni_cliniche " +
            "(data_ricovero, diagnosi, anamnesi, consulenza_chiurugica, consulenza_anestesiologica, id_cartella)" +
            "VALUES (" +
            "'" + dataIni                                              +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.diagnosi)                    +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.anamnesi)                    +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.consulenza_chiurugica)       +"', " +
            "'" + replaceAll("'", "`",datiInformazioniPaziente.consulenza_anestesiologica)  +"', " +
            "'" + datiInformazioniPaziente.id_cartella                 +"')";

    }

    var client = connectionPostgres();

    const query = client.query(queryPostInformazioni);

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