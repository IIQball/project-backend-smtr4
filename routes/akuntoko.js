const express = require('express')
const routerToko = express.Router()
const ctrlToko = require('../controller/akuntoko')

routerToko.get('/toko',ctrlToko.getToko)
routerToko.post('/toko',ctrlToko.tambahToko)
routerToko.post('/:idUser/akuntoko/register',ctrlToko.register)
routerToko.post('/akuntoko/login',ctrlToko.login)
routerToko.delete('/toko/:id',ctrlToko.hapusToko)

module.exports = routerToko