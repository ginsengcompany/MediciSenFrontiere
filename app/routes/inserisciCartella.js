var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiCartella = req.body;
    var queryPostCartella = "INSERT INTO medici_senza_frontiere.tb_cartella_clinica " +
        "(anni, peso, numero_cartella, cartella, id_paziente, foto_paziente)" +
        "VALUES (" +
        "'" + datiCartella.anni               +"', " +
        "'" + datiCartella.peso               +"', " +
        "'" + datiCartella.numero_cartella    +"', " +
        "'" + datiCartella.cartella           +"', " +
        "'" + datiCartella.id_paziente        +"', " +
        "'" + datiCartella.foto_paziente      +"')";

    var client = connectionPostgres();

    const query = client.query(queryPostCartella);

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