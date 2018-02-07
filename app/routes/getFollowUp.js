var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiFollowup = req.body;
    var queryPostFollowup = "SELECT " +
        "   tb_follow_up._id, " +
        "  tb_follow_up.id_intervento, " +
        "  tb_follow_up.indagini_ecografiche, " +
        "  tb_follow_up.indagini_radiografiche, " +
        "  tb_follow_up.indagini_ematochimiche, " +
        "  tb_follow_up.follow_up, " +
        "  tb_follow_up.anni_precedenti" +
        " FROM " +
        "  medici_senza_frontiere.tb_intervento, " +
        "  medici_senza_frontiere.tb_follow_up" +
        " WHERE " +
        "  tb_intervento._id = tb_follow_up.id_intervento AND" +
        "  tb_intervento._id = "+datiFollowup.id_tb_intervento;
    var client = connectionPostgres();

    var query = client.query(queryPostFollowup);

    query.on("row", function (row, result) {
        result.addRow(row);
    });

    query.on("end", function (result) {
        var myOjb = JSON.stringify(result.rows, null, "    ");
        var final = JSON.parse(myOjb);
        var jsonFinale = {
            "data": final
        };
		client.end();
        return res.json(jsonFinale);
    });


});

module.exports = router;