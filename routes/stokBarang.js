const express = require('express');
const routerStokBarang = express.Router();
const ctrStokBarang = require('../controller/stokBarang')

routerStokBarang.get('/:idUser/stok-barang', ctrStokBarang.getAllStock);
routerStokBarang.get('/:idUser/stok-barang/:namaToko', ctrStokBarang.getStockByToko);
routerStokBarang.get('/:idUser/list-toko', ctrStokBarang.getListToko);
routerStokBarang.post('/:idUser/update-stok', ctrStokBarang.updateStok);
routerStokBarang.post('/:idUser/add-stok', ctrStokBarang.AddItem);

module.exports = routerStokBarang;