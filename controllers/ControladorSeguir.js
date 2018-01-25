var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    seguirPersona: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_persona = req.query.id_persona;
        var id_seguidor = req.query.id_seguidor;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionSeguidor('1', '" + id_persona + "', '" + id_seguidor + "') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    dejarSeguirPersona: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_persona = req.query.id_persona;
        var id_seguidor = req.query.id_seguidor;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionSeguidor('2', '" + id_persona + "', '" + id_seguidor + "') as msm", function (err, rows, fields) {
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