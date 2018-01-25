var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {
    guardarComentario: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var comentario = req.query.comentario;
        var id_publicacion = req.query.id_publicacion;
        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionComentario('1', '" + comentario + "'," + id_publicacion + ", '" + id_usuario + "') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarComentarios: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_publicacion = req.query.id_publicacion;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT "
        +"(SELECT persona.nick FROM persona WHERE persona.idPersona = comentario.idPersona) AS 'nick', "
        +"comentario.fecha, "
        +"comentario.descripcion "
        +"FROM "
        +"comentario "
        +"WHERE "
        +"comentario.idPublicacion = "+id_publicacion+"", function (err, rows, fields) {
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