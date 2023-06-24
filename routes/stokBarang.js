const express = require('express');
const routerStokBarang = express.Router();
const ctrStokBarang = require('../controller/stokBarang')

routerStokBarang.get('/:idUser/stok-barang', ctrStokBarang.getAllStock);

module.exports = routerStokBarang;