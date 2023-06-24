const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// routers
const routerAkunToko = require('./routes/akuntoko');
const routerStokBarang = require('./routes/stokBarang');
const routertransaksi = require('./routes/transaksi');
const routerlistbarang = require('./routes/listbarang');

// Untuk menerima req.body
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());
// call router
app.use(routerAkunToko);
app.use(routerStokBarang);
app.use(routertransaksi);
app.use(routerlistbarang);

app.listen(port,() => {
    console.log(`Server Berjalan Pada Port ${port}`);
})