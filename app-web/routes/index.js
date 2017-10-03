'use strict';
let express = require('express');
let router = express.Router();

let indexCtrl = require('../controllers/indexController');
let homeCtrl = require('../controllers/homeController');


router.get('/', indexCtrl.main);
router.get('/home', homeCtrl.main);
router.get('/send_to_sign', homeCtrl.sentToSign);

module.exports = router;
