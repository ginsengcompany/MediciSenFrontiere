var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiFoto = req.body;
    var id_intervento = datiFoto.id_intervento;
    var foto_intervento = datiFoto.foto_intervento;

    var queryPostIntervento = "INSERT INTO medici_senza_frontiere.tb_foto_intervento " +
        "(id_intervento, foto_intervento)" +
        "VALUES (" +
        "'" + id_intervento         +"', " +
        "'" + foto_intervento       +"')";

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