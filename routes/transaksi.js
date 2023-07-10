const express = require('express');
const routertransaksi = express.Router();
const ctrtransaksi = require('../controller/transaksi')

// transaksi
routertransaksi.get('/transaksi',ctrtransaksi.getTransaksi)
routertransaksi.get('/transaksi/:nomorStruk',ctrtransaksi.getTransaksiBynomorStruk)
routertransaksi.post('/transaksi',ctrtransaksi.insertTransaksi)
// routertransaksi.put('/transaksi/:nomorStruk', ctrtransaksi.updateTransaksiBynomorStruk)
routertransaksi.put('/transaksi/:kodeBarang', ctrtransaksi.kurangiStok)
routertransaksi.delete('/transaksi/:nomorStruk', ctrtransaksi.deleteTransaksiBynomorStruk)

module.exports = routertransaksi;