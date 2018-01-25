var mysql = require('mysql');
var config = require('.././database/database.js');
var bcrypt = require('bcrypt');

module.exports = {
    validarInicioSesion: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var email_usu = req.query.email_usu;
        var pass_usu = req.query.pass_usu;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario('5', null, '" + email_usu + "', 'null', 'null') as usuario", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {

                var orgPassword = bcrypt.compareSync(pass_usu, rows[0].usuario);
                db.end();

                if (orgPassword == true) {

                    var db2 = mysql.createConnection(config);
                    db2.connect();

                    db2.query("SELECT usuario.idUsuario AS 'usuario', usuario.email AS 'password' FROM usuario WHERE usuario.email = '" + email_usu + "'", function (err, rows, fields) {
                        if (err) {
                            console.log(err);
                            db2.end();
                        } else {
                            res.send(rows);
                            db2.end();
                        }
                    });

                } else {
                    res.send(false);
                }
            }
        });
    },

    
    validarUsuarioHuellaDigital: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var nick = req.query.nick;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT usuario.idUsuario AS 'usuario', usuario.email AS 'password' FROM usuario INNER JOIN persona ON persona.idUsuario = usuario.idUsuario WHERE persona.nick = '" + nick + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    registrarUsuario: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var email_usu = req.query.email_usu;
        var pass_usu = req.query.pass_usu;
        var nick_per = req.query.nick_per;

        var salt = bcrypt.genSaltSync();
        var encryptedPassword = bcrypt.hashSync(pass_usu, salt);

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario('1', null, '" + email_usu + "', '" + encryptedPassword + "' ,'" + nick_per + "') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    modificarUsuario: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;
        var email_usu = req.query.email_usu;
        var pass_usu = req.query.pass_usu;

        var salt = bcrypt.genSaltSync();
        var encryptedPassword = bcrypt.hashSync(pass_usu, salt);

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario('2', '" + id_usuario + "', '" + email_usu + "', '" + encryptedPassword + "', 'null') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    eliminarUsuario: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario('3', '" + id_usuario + "', 'null', 'null', 'null') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    restaurarUsuario: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario('4', '" + id_usuario + "', 'null', 'null', 'null') as msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    },

    buscarUsuarioCodigo: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT persona.nick, usuario.email, usuario.idUsuario FROM usuario LEFT JOIN persona ON persona.idUsuario = usuario.idUsuario WHERE usuario.idUsuario = '" + id_usuario + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });

    }
}