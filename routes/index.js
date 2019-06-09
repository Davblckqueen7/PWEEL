var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

var typeID = '';
var numID = '';
var email = '';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'PWEEL | Trabajo',
        style: 'style.css'
    });
});

router.get('/user/cv', isLoggedIn, function(req, res, next) {
    res.render('user/cv', {
        title: 'PWEEL | Hoja de vida',
        style: 'style_cv.css',
        csrfToken: req.csrfToken()
    })
});

router.get('/user/logout', isLoggedIn, function(req, res, next) {
    typeID = '';
    numID = '';
    email = '';
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/user/iniciarsesion', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/iniciarsesion', {
        title: 'PWEEL | Iniciar sesión',
        style: 'style_inisec.css',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/user/iniciarsesion', passport.authenticate('local.singin', {
    successRedirect: '/user/cv',
    failureRedirect: '/user/iniciarsesion',
    failureFlash: true
}));


router.get('/user/registro1', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/registro1', {
        title: 'PWEEL | Registro',
        csrfToken: req.csrfToken(),
        style: 'style_reg.css',
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/user/registro1', function(req, res, next) {
    typeID = req.body.IDType;
    numID = req.body.IDNum.toString();
    email = req.body.email.toString();

    req.checkBody('email', 'El correo ingresado es invalido, como tu :v').notEmpty().isEmail();

    var errors = req.validationErrors();
    User.findOne({
        'email': email
    }, function(err, user) {
        var messages = [];
        var hay_error = false;
        if (err) {
            messages.push(err);
        }
        if (user) {
            messages.push('El correo ya esta en uso.');
        }
        if (errors) {

            errors.forEach(function(error) {
                messages.push(error.msg);
            });

        }
        if (hay_error) {
            req.flash('error', messages);
        } else {
            res.redirect('/user/registro2');
        }
    });
});

router.get('/user/registro2', function(req, res, next) {
    var messages = req.flash('error');
    console.log("numMSG: --------------------------->" + messages.length);
    res.render('user/registro2', {
        title: 'PWEEL | Registro',
        gtypeID: typeID,
        gnumID: numID,
        gemail: email,
        style: 'style_reg2.css',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    })
});


router.post('/user/registro2', passport.authenticate('local.signup2', {
    successRedirect: '/user/cv',
    failureRedirect: '/user/registro2',
    failureFlash: true

}));

//protección (Middlewares):
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;