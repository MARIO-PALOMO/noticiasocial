var mysql = require('mysql');
var config = require('.././database/database.js');
var bcrypt = require('bcrypt');

module.exports = {

    buscarPersonas: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT persona.idPersona, persona.nick, persona.nombre FROM usuario LEFT JOIN persona ON persona.idUsuario = usuario.idUsuario WHERE usuario.idUsuario != '" + id_usuario + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarPersonasBuscador: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var par_busqueda = req.query.par_busqueda;
        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT persona.idPersona, persona.nick, persona.nombre FROM usuario LEFT JOIN persona ON persona.idUsuario = usuario.idUsuario WHERE (persona.nombre LIKE '%" + par_busqueda + "%' OR persona.nick LIKE '%" + par_busqueda + "%' ) AND usuario.idUsuario !=" + id_usuario + " ", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarPersona: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var per_email = req.query.per_email;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM _buscar_persona_id WHERE email = '" + per_email + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    modificarPersona: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_persona = req.query.id_persona;
        var nick_persona = req.query.nick_persona;
        var nombre_persona = req.query.nombre_persona;
        var telefono_persona = req.query.telefono_persona;
        var direccion_persona = req.query.direccion_persona;
        var genero_persona = req.query.genero_persona;
        var usuario_persona = req.query.usuario_persona;
        var pais_persona = req.query.pais_persona;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionPersona('2', '" + id_persona + "', '" + nick_persona + "', '" + nombre_persona + "','" + telefono_persona + "','" + direccion_persona + "','" + genero_persona + "','" + usuario_persona + "', '" + pais_persona + "') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarPersonasSiguiendo: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_persona = req.query.id_persona;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM _personas_siguiendo WHERE usuario = " + id_persona + "", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarPersonasSiguiendoBuscador: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var par_busqueda = req.query.par_busqueda;
        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM _personas_siguiendo WHERE (nombre LIKE '%" + par_busqueda + "%' OR nick LIKE '%" + par_busqueda + "%') AND usuario = " + id_usuario + "", function (err, rows, fields) {
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