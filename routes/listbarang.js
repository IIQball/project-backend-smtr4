const express = require('express');
const routerlistbarang = express.Router();
const ctrlistbarang = require('../controller/listbarang')

// listbarang
routerlistbarang.get('/listbarang',ctrlistbarang.getlistbarang)
routerlistbarang.get('/listbarang/:id',ctrlistbarang.getlistbarangbyId)
routerlistbarang.post('/listbarang',ctrlistbarang.insertlistbarang)
routerlistbarang.put('/listbarang/:id', ctrlistbarang.updatelistbarang)
routerlistbarang.delete('/listbarang/:id', ctrlistbarang.deletelistbarang)

module.exports = routerlistbarang;