var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiFollowUp = req.body;
    var id_paziente = datiFollowUp.id_paziente;
    var id_intervento = datiFollowUp.id_intervento;
    var indagini_radiografiche = datiFollowUp.indagini_radiografiche;
    var indagini_ecografiche = datiFollowUp.indagini_ecografiche;
    var indegini_ematochimiche = datiFollowUp.indegini_ematochimiche;
    var follow_up = datiFollowUp.follow_up;
    var anni_precedenti = datiFollowUp.anni_precedenti;

    var queryPostIntervento = "INSERT INTO medici_senza_frontiere.tb_follow_up " +
        "(id_paziente, id_intervento, indagini_radiografiche, indagini_ecografiche, indegini_ematochimiche, follow_up, anni_precedenti)" +
        "VALUES (" +
        "'" + id_paziente           +"', " +
        "'" + id_intervento         +"', " +
        "'" + indagini_radiografiche           +"', " +
        "'" + indagini_ecografiche         +"', " +
        "'" + indegini_ematochimiche           +"', " +
        "'" + follow_up         +"', " +
        "'" + anni_precedenti       +"')";

    var client = connectionPostgres();

    const query = client.query(queryPostIntervento);

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