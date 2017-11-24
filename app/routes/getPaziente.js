var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.get('/',function (req, res, next) {
    var queryGetAnagrafica = "SELECT cognome , nome , id, foto_paziente FROM medici_senza_frontiere.tb_anagrafica"
    var client = connectionPostgres();

    var query = client.query(queryGetAnagrafica);

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