const express = require('express');
const routerAkunToko = express.Router();
const ctrAkunToko = require('../controller/akuntoko')

// Akuntoko
routerAkunToko.get('/akuntoko',ctrAkunToko.getAkunToko)
routerAkunToko.get('/akuntoko',)

module.exports = routerAkunToko;