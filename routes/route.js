var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');
const fileUpload = require('express-fileupload');

//TRANSACCIONES DE USUARIO

router.get('/ValidarSesion', controllers.ControladorUsuario.validarInicioSesion);
router.get('/ValidarSesionHuellaDactilar', controllers.ControladorUsuario.validarUsuarioHuellaDigital);
router.get('/RegistrarUsuario', controllers.ControladorUsuario.registrarUsuario);
router.get('/ModificarrUsuario', controllers.ControladorUsuario.modificarUsuario);
router.get('/EliminarUsuario', controllers.ControladorUsuario.eliminarUsuario);
router.get('/RestaurarUsuario', controllers.ControladorUsuario.restaurarUsuario);
router.get('/UsuarioBuscarCodigo', controllers.ControladorUsuario.buscarUsuarioCodigo);

//TRANSACCIONES DE GESTION
router.get('/GeneroBuscar', controllers.ControladorGestion.buscarGenero);
router.get('/PaisBuscar', controllers.ControladorGestion.buscarPais);
router.get('/TipoPublicacionBuscar', controllers.ControladorGestion.buscarTipoPublicacion);
router.get('/TipoPublicacionBuscarPersonas', controllers.ControladorGestion.buscarTipoPublicacionPersonas);


//TRANSACCIONES DE PERSONAS
router.get('/PersonasBuscar', controllers.ControladorPersonas.buscarPersonas);
router.get('/PersonaBuscar', controllers.ControladorPersonas.buscarPersona);
router.get('/PersonasBuscarBuscador', controllers.ControladorPersonas.buscarPersonasBuscador);
router.get('/PersonasModificar', controllers.ControladorPersonas.modificarPersona);

router.get('/PersonasBuscarSiguiendo', controllers.ControladorPersonas.buscarPersonasSiguiendo);
router.get('/PersonasBuscarSiguiendoBuscador', controllers.ControladorPersonas.buscarPersonasSiguiendoBuscador);

//TRANSACCIONES SEGUIR PERSONAS
router.get('/SeguidorSeguir', controllers.ControladorSeguir.seguirPersona);
router.get('/SeguidorDejarSeguir', controllers.ControladorSeguir.dejarSeguirPersona);

//TRANSACCIONES DE PUBLICACION
router.use(fileUpload());
router.post('/PublicacionGuardar', controllers.ControladorPublicacion.guardarPublicacion);
router.get('/PublicacionBuscar', controllers.ControladorPublicacion.buscarPublicacion);
router.get('/PublicacionBuscarDetalle', controllers.ControladorPublicacion.buscarPublicacionDetalle);
router.get('/PublicacionSeguidoresBuscar', controllers.ControladorPublicacion.buscarPublicacionesSeguidores);
router.get('/PublicacionBuscarTipo', controllers.ControladorPublicacion.buscarPublicacionTipo);

//TRANSACCIONES REACCION
router.get('/ReaccionGuardar', controllers.ControladorReaccion.registrarReaccion);

//TRANSACCIONES COMENTARIOS
router.get('/ComentarioGuardar', controllers.ControladorComentario.guardarComentario);
router.get('/ComentarioBuscar', controllers.ControladorComentario.buscarComentarios);


//TRANSACCIONES REPORTE
router.get('/ReporteGuardar', controllers.ControladorReporte.registrarReporte);

//router.get('/ValidarSesion/:id?', controllers.inicio.comprobacionRESTAPI);

module.exports = router;
