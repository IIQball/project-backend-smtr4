const express = require('express')
const routerBrg = express.Router()
const ctrlBrg = require('../controller/tambahbarang')

routerBrg.get('/barang',ctrlBrg.getBrg)
routerBrg.get('/barang/:kodeBarang',ctrlBrg.getByKodeBrg)
routerBrg.post('/barang',ctrlBrg.tambahBrg)
routerBrg.put('/barang/:kode',ctrlBrg.updateBrg)
routerBrg.delete('/barang/:kode',ctrlBrg.hapusBrg)

module.exports = routerBrg