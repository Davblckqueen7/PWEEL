var express = require('express');
var router = express.Router();
var vacante = require('../models/vacante');
var vacante_actual_id = '';
var vacante_actual_nombre = '';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'PWEEL | Trabajo',
        style: 'style.css'
    });
});

/* Obtener pagina de trabajos. */
router.get('/trabajos', function(req, res, next) {
    vacante.find({}, function(err, docs) {
        chunk1 = [];
        chunk2 = [];
        for (var i = 0; i < docs.length; i++) {
            if (i % 2 == 0) {
                chunk1.push(docs[i]);
            } else {
                chunk2.push(docs[i]);
            }

        }
        vacantesCol1 = docs;
        res.render('trabajos', {
            title: 'Trabajos | PWEEL',
            style: 'style_trabajos.css',
            vacantes1: chunk1,
            vacantes2: chunk2,
        });
    });

});

/* Obtener pagina de vacantes. */
router.get('/vacantes', function(req, res, next) {
    vacante.find({}, function(err, docs) {
        chunk1 = [];
        chunk2 = [];
        for (var i = 0; i < docs.length; i++) {
            if (i % 2 == 0) {
                chunk1.push(docs[i]);
            } else {
                chunk2.push(docs[i]);
            }

        }
        vacantesCol1 = docs;
        res.render('vacantes', {
            title: 'Vacantes | PWEEL',
            style: 'style_vacantes.css',
            vacantes1: chunk1,
            vacantes2: chunk2,
            doctam: docs.length
        });
    });

});

router.post('/vacantes', function(req, res, next) {

    var vacante_actual_id = req.body.id_de_la_vacante;
    vacante_actual_nombre = req.body.nombre_de_la_vacante;
    console.log("------------------------> Entro al post de mierda!!! ====> " + vacante_actual_id);
    res.redirect('/confing_vacante/' + vacante_actual_id);
});

/* Obtener pagina de postulados. */
router.get('/postulados', function(req, res, next) {
    res.render('postulados', {
        title: 'PWEEL | Postulados',
        style: 'style_postulado.css'
    });
});

/* Obtener pagina de confing_vacante. */
router.get('/confing_vacante/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('confing_vacante', {
        title: 'PWELL | Config vacante',
        style: 'style_conf_vacante.css',
        la_puta_id: id,
        nombre_cargo: vacante_actual_nombre
    });
});

/* Obtener pagina de confing_user. */
router.get('/confing_user', function(req, res, next) {
    res.render('confing_user', {
        title: 'PWEEL | confing_user',
        style: 'style_confing_user.css'
    });
});

router.get('/terminos_condiciones', function(req, res, next) {
    res.render('terminos_condiciones', {
        title: 'PWEEL | terminos_condiciones',
        style: 'style_terms.css'
    });
});
module.exports = router;