var mysql = require('mysql');
var config = require('.././database/database.js');
const fileUpload = require('express-fileupload');

module.exports = {
    guardarPublicacion: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        let sampleFile = req.files.file;
        var NombreArchivo = req.files.file.name;
        var mail_usu = req.body.mail_usu;
        var descripcion_pub = req.body.descripcion_pub;
        var tipo_pub = req.body.tipo_pub;

        sampleFile.mv('imagenes/' + NombreArchivo, function (err) {

            if (err) {
                return res.status(500).send(err);
            } else {
                var db = mysql.createConnection(config);
                db.connect();
                db.query("SELECT GestionPublicacion('1', null, 'imagenes/" + NombreArchivo + "', '" + mail_usu + "', '" + descripcion_pub + "', '" + tipo_pub + "') as msm", function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        db.end();
                    } else {
                        res.send(rows);
                        db.end();
                    }
                });
            }
        });

    },

    buscarPublicacion: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM _publicacion WHERE idUsuario = '" + id_usuario + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {

                res.send(rows);
                db.end();
            }
        });
    },

    buscarPublicacionDetalle: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;
        var id_publicacion = req.query.id_publicacion;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM _publicacion_detalle WHERE idUsuario = " + id_usuario + " AND idPublicacion = " + id_publicacion + "", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {

                res.send(rows);
                db.end();
            }
        });
    },

    buscarPublicacionesSeguidores: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_usuario = req.query.id_usuario;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL _buscar_seguidores(" + id_usuario + ")", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {

                var consulta;
                var parametro = '';

                if (rows[0].length == 0) {

                    parametro = ('idPersona = 0');

                } else if (rows[0].length == 1) {

                    consulta = 'idPersona = ' + rows[0][0].idPersona + ' OR ';
                    parametro = consulta.substr(0, (consulta.length - 4));

                } else {

                    consulta = '';

                    for (var i = 0; i < rows.length; i++) {
                        consulta += 'idPersona = ' + rows[0][i].idPersona + ' OR ';
                    }

                    parametro = consulta.substr(0, (consulta.length - 4));
                }

                db.end();

                console.log(parametro);

                var db2 = mysql.createConnection(config);
                db2.connect();

                db2.query("SELECT * FROM _publicacion WHERE " + parametro + "", function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        db2.end();
                    } else {
                        res.send(rows);
                        db2.end();
                    }
                });

            }
        });
    },

    buscarPublicacionTipo: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id_persona = req.query.id_persona;
        var tipo_publicacion = req.query.tipo_publicacion;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM _publicacion WHERE idPersona = " + id_persona + " AND tipo = '" + tipo_publicacion + "'", function (err, rows, fields) {
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