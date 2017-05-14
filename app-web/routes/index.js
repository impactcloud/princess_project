'use strict';
let express = require('express');
let router = express.Router();

let indexCtrl = require('../controllers/indexController');
let homeCtrl = require('../controllers/homeController');


router.get('/', indexCtrl.main);
router.get('/home', homeCtrl.main);

module.exports = router;
