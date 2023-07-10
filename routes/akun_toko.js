const express = require('express')
const routerToko = express.Router()
const ctrlToko = require('../controller/akun_toko')

routerToko.get('/toko',ctrlToko.getToko)
routerToko.get('/toko/:idToko',ctrlToko.getTokoById)
routerToko.post('/register',ctrlToko.register)
routerToko.put('/toko/:id', ctrlToko.editToko)
routerToko.delete('/toko/:id',ctrlToko.hapusToko)

module.exports = routerToko;