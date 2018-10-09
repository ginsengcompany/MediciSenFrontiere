var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {

    var cartella = req.body.cartella;
    var numero_cartella = req.body.numero_cartella;
    var queryGetCartella = "SELECT tb_anagrafica.cognome , tb_anagrafica.nome FROM medici_senza_frontiere.tb_cartella_clinica INNER JOIN medici_senza_frontiere.tb_anagrafica ON tb_anagrafica._id = tb_cartella_clinica.id_paziente WHERE tb_cartella_clinica.cartella='"+cartella+"' AND tb_cartella_clinica.numero_cartella='"+numero_cartella+"'"

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




