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
        "SELECT " +
        "  tb_intervento.data_intervento, " +
        "  tb_intervento.descrizione_intervento, " +
        "  tb_intervento.complicanze, " +
        "  tb_intervento.foglio_diario_clinico, " +
        "  tb_intervento._id " +
        "FROM " +
        "  medici_senza_frontiere.tb_anagrafica, " +
        "  medici_senza_frontiere.tb_cartella_clinica, " +
        "  medici_senza_frontiere.tb_intervento " +
        "WHERE " +
        "  tb_anagrafica._id = tb_cartella_clinica.id_paziente AND " +
        "  tb_cartella_clinica._id = tb_intervento.id_cartella AND " +
        "  tb_cartella_clinica.id_paziente = " + idPaziente + " " +
        "AND " +
        "  tb_cartella_clinica._id = " + idCartella + ";";

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