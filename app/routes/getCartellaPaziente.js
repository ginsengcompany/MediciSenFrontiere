var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {

    var idPaziente = req.body._id;
    var queryGetCartella =
        "SELECT tb_cartella_clinica.numero_cartella, tb_cartella_clinica.cartella, tb_anagrafica._id, tb_cartella_clinica.foto_paziente, tb_cartella_clinica._id  AS id_cartella, tb_cartella_clinica.anni, tb_cartella_clinica.peso "+
        "FROM medici_senza_frontiere.tb_cartella_clinica, medici_senza_frontiere.tb_anagrafica " +
        "WHERE tb_anagrafica._id = tb_cartella_clinica.id_paziente AND " +
        "tb_anagrafica._id = " + idPaziente;

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