const express = require('express');
const routerKasir = express.Router();
const ctrKasir = require('../controller/kasirlogin');

// USER
routerKasir.post('/login', ctrKasir.Login)
routerKasir.get('/logout', ctrKasir.logout)

module.exports = routerKasir;