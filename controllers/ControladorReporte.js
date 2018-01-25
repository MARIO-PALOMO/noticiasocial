var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {
    registrarReporte: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_pub = req.query.id_pub;
        var id_per = req.query.id_per;
        var id_razon_rep = req.query.id_razon_rep;
        var descripcion = req.query.descripcion;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionReporte('1','"+id_pub+"','"+id_per+"','"+id_razon_rep+"','"+descripcion+"') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },
}