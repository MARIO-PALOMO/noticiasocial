var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarGenero: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT genero.nombre AS 'text', genero.nombre AS 'value' FROM genero", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarPais: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT pais.nombre AS 'text', pais.nombre AS 'value' FROM pais ORDER BY pais.nombre ASC", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarTipoPublicacion: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT tipo_publicacion.nombre AS 'text', tipo_publicacion.idTipoPublicacion AS 'value' FROM tipo_publicacion", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarTipoPublicacionPersonas: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var par_busqueda = req.query.par_busqueda;
        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT "
            + "tipo_publicacion.idTipoPublicacion AS 'idTipo', "
            + "tipo_publicacion.nombre, "
            + "persona.nick, "
            + "persona.idPersona "
            + "FROM "
            + "publicacion "
            + "INNER JOIN tipo_publicacion ON publicacion.idTipoPublicacion = tipo_publicacion.idTipoPublicacion "
            + "INNER JOIN persona ON publicacion.idPersona = persona.idPersona "
            + "WHERE "
            + "(" + par_busqueda + ") "
            + "AND "
            + "persona.idPersona != (SELECT "
            + "persona.idPersona "
            + "FROM "
            + "persona "
            + "INNER JOIN usuario ON persona.idUsuario = usuario.idUsuario "
            + "WHERE "
            + "usuario.idUsuario = " + id_usuario + ") "
            + "GROUP BY "
            + "tipo_publicacion.nombre, "
            + "persona.nick", function (err, rows, fields) {
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