var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiCartella = req.body;

    client = connectionPostgres();

    var queryPostCartellaEsistente = "SELECT * FROM medici_senza_frontiere.tb_cartella_clinica WHERE id_paziente="+datiCartella.id_paziente+
                                     " AND cartella='"+datiCartella.cartella+"' AND"+
                                     " numero_cartella='"+datiCartella.numero_cartella+"'";

    const query = client.query(queryPostCartellaEsistente);

    query.on("row", function (row, result) {
        result.addRow(row);
    });

    query.on("end", function (result) {
        var myOjb = JSON.stringify(result.rows, null, "    ");
        var final = JSON.parse(myOjb);
        if(final.length>0){
            return res.json({errore:'Numero Cartella Già PRESENTE!'});
        }
        else if(final.length===0){

            var queryPostCartella = "INSERT INTO medici_senza_frontiere.tb_cartella_clinica " +
                "(anni, peso, numero_cartella, cartella, id_paziente, foto_paziente)" +
                "VALUES (" +
                "'" + datiCartella.anni               +"', " +
                "'" + datiCartella.peso               +"', " +
                "'" + datiCartella.numero_cartella    +"', " +
                "'" + datiCartella.cartella           +"', " +
                "'" + datiCartella.id_paziente        +"', " +
                "'" + datiCartella.foto_paziente      +"')";



            const query1 = client.query(queryPostCartella);

            query1.on("row", function (row, result) {
                result.addRow(row);
            });

            query1.on("end", function (result) {
                var myOjb = JSON.stringify(result.rows, null, "    ");
                var final = JSON.parse(myOjb);
                return res.json(final);
                client.end();
            });

        }
        client.end();
    });


    /**/
});

module.exports = router;