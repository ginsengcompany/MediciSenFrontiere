var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiFotoIntervento = req.body;
    var queryPostFotoIntervento = "SELECT foto_intervento FROM medici_senza_frontiere.tb_foto_intervento WHERE id_paziente = ' " + datiFotoIntervento.username +"' AND id_intervento = ' "+ datiFotoIntervento.intervento +"'";
    var client = connectionPostgres();

    var query = client.query(queryPostFotoIntervento);

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