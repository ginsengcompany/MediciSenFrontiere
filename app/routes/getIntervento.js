var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiIntervento = req.body;
    var queryPostIntervento =
        "SELECT " +
        " tb_intervento._id AS id_tb_intervento, tb_cartella_clinica._id AS id_tb_cartella, tb_anagrafica._id AS id_tb_anagrafica, tb_intervento.descrizione_intervento, tb_intervento.data_intervento, tb_intervento.descrizione_intervento, tb_intervento.foglio_diario_clinico, tb_intervento.complicanze " +
        "FROM " +
        "medici_senza_frontiere.tb_cartella_clinica, medici_senza_frontiere.tb_anagrafica, medici_senza_frontiere.tb_intervento " +
        "WHERE " +
        "tb_cartella_clinica._id = tb_intervento.id_cartella AND tb_anagrafica._id = tb_cartella_clinica.id_paziente " +
        "AND " +
        "tb_anagrafica._id = " + datiIntervento.username + " AND tb_cartella_clinica._id ="+datiIntervento.id_cartella;
    var client = connectionPostgres();

    var query = client.query(queryPostIntervento);

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