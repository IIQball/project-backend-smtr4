const express = require('express');
const app = express();
const port = 5000;

// routers
const routerAkunToko = require('./routes/akuntoko');
const routerStokBarang = require('./routes/stokBarang');

// Untuk menerima req.body
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// call router
app.use(routerAkunToko);
app.use(routerStokBarang);

app.listen(port,() => {
    console.log(`Server Berjalan Pada Port ${port}`);
})