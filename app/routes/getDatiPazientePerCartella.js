var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {

    var idPaziente = req.body.idPaziente;
    var idCartella = req.body.idCartella;

    var queryGetDatiPerCartella =
        "SELECT tb_anagrafica.nome, " +
        "tb_anagrafica.cognome, " +
        "tb_anagrafica.sesso, " +
        "tb_anagrafica.villaggio, " +
        "tb_anagrafica.contea, " +
        "tb_anagrafica.madre, " +
        "tb_anagrafica.distretto, " +
        "tb_anagrafica.padre, " +
        "tb_anagrafica.telefono, " +
        "tb_anagrafica.malaria, " +
        "tb_anagrafica.malaria_inizio, " +
        "tb_anagrafica.malaria_fine, " +
        "tb_cartella_clinica.peso, " +
        "tb_cartella_clinica.anni " +
        "FROM " +
        "medici_senza_frontiere.tb_anagrafica, " +
        "medici_senza_frontiere.tb_cartella_clinica " +
        "WHERE " +
        "tb_anagrafica._id = tb_cartella_clinica.id_paziente " +
        "AND " +
        "tb_cartella_clinica._id = " + idCartella + " " +
        "AND " +
        "tb_anagrafica._id = " + idPaziente + ";";

    var client = connectionPostgres();

    var query = client.query(queryGetDatiPerCartella);

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