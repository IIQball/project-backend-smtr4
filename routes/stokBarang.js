const express = require('express');
const routerStokBarang = express.Router();
const ctrStokBarang = require('../controller/stokBarang')

routerStokBarang.get('/stokbarang', ctrStokBarang.getStokBarang);
routerStokBarang.get('/stokbarang/:id', ctrStokBarang.getByID);
routerStokBarang.post('/stokbarang', ctrStokBarang.inputData);
routerStokBarang.put('/stokbarang/:id', ctrStokBarang.editData);

routerStokBarang.delete('/stokbarang/:id', ctrStokBarang.delData);

module.exports = routerStokBarang;