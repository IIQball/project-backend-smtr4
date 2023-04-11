const express = require('express');
const routerakuntoko = express.Router();
const ctrakuntoko = require('../controller/akuntoko')

// Akuntoko
routerakuntoko.get('/akuntoko',ctrakuntoko.getAkunToko)
routerakuntoko.get('/akuntoko/:id',ctrakuntoko.getAkunTokoById)
routerakuntoko.post('/akuntoko',ctrakuntoko.insertAkunToko)
routerakuntoko.put('/akuntoko/:id', ctrakuntoko.updateAkunToko)
routerakuntoko.delete('/akuntoko/:id', ctrakuntoko.deleteAkunToko)

module.exports = routerakuntoko;