var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiInformazioni = req.body;
    var queryPostInformazioni = "SELECT * FROM medici_senza_frontiere.tb_informazioni_cliniche WHERE id_paziente = ' " + datiInformazioni.username +"'";
    var client = connectionPostgres();

    var query = client.query(queryPostInformazioni);

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