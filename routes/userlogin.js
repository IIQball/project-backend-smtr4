const express = require('express');
const routerUser = express.Router();
const ctrUser = require('../controller/userlogin');

// USER
routerUser.post('/login', ctrUser.Login)
routerUser.get('/logout', ctrUser.logout)

module.exports = routerUser;