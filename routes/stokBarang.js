const express = require('express');
const routerStokBarang = express.Router();
const ctrStokBarang = require('../controller/stokBarang')

routerStokBarang.get('/stok-barang', ctrStokBarang.getStokBarang);
routerStokBarang.get('/stok-barang/:idToko', ctrStokBarang.getStokBarang);

module.exports = routerStokBarang;