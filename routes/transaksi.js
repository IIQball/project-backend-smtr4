const express = require('express');
const routertransaksi = express.Router();
const ctrtransaksi = require('../controller/transaksi')

// transaksi
routertransaksi.get('/transaksi',ctrtransaksi.getTransaksi)
routertransaksi.get('/transaksi/:id',ctrtransaksi.getTransaksibyId)
routertransaksi.post('/transaksi',ctrtransaksi.insertTransaksi)
routertransaksi.put('/transaksi/:id', ctrtransaksi.updateTransaksi)
routertransaksi.delete('/transaksi/:id', ctrtransaksi.deleteTransaksi)

module.exports = routertransaksi;