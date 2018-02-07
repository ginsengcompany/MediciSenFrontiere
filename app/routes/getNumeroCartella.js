var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {

    var id_cartella = req.body.id_cartella;
    var queryGetCartella =
        "SELECT * " +
        "FROM medici_senza_frontiere.tb_cartella_clinica " +
        "WHERE tb_cartella_clinica._id = " + id_cartella;

    var client = connectionPostgres();

    var query = client.query(queryGetCartella);

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




