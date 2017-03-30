'use strict';
let express = require('express');
let router = express.Router();
let passport = require('passport');
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

let indexCtrl = require('../controllers/indexController');
let homeCtrl = require('../controllers/homeController');
let dashboardCtrl = require('../controllers/dashboardController');

let filesCtrl = require('../controllers/filesController');

router.get('/', indexCtrl.main);
router.get('/login', indexCtrl.main)
router.get('/home', homeCtrl.main);
router.get('/logout', homeCtrl.logout);
router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/' }), homeCtrl.callback);

router.get('/dashboard/:id?', ensureLoggedIn, dashboardCtrl.main);
router.post('/dashboard/:id?/folder', ensureLoggedIn, dashboardCtrl.addFolder);

router.get('/files/:id', ensureLoggedIn, filesCtrl.main);
router.get('/files/:id/thumbnail', ensureLoggedIn, filesCtrl.thumbnail);
router.get('/files/:id/preview', ensureLoggedIn, filesCtrl.preview);

module.exports = router;
