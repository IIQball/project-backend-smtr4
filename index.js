const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const FileUpload = require("express-fileupload")
const session = require('express-session')

// routers
const routerAkunToko = require('./routes/akuntoko');
const routerStokBarang = require('./routes/stokBarang');
const routertransaksi = require('./routes/transaksi');
const routerlistbarang = require('./routes/listbarang');
const routerUser = require('./routes/userlogin');
const routerKasir = require('./routes/kasirlogin');

const routerToko = require('./routes/akun_toko')

const routerBrg = require('./routes/tambahbarang')

// Untuk menerima req.body
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors({origin : "http://localhost:5173", credentials : true}));
app.use(FileUpload());
app.use(express.static('public'))

app.use(session({
    secret: 'akuganteng',
    resave: false,
    saveUninitialized: false,
    cookie : {
        httpOnly : false,
        secure : false
    }
}))

// call router
app.use(routerAkunToko);
app.use(routerStokBarang);
app.use(routertransaksi);
app.use(routerlistbarang);
app.use(routerUser);

app.use(routerKasir);

app.use(routerToko);

app.use(routerBrg)

app.listen(port,() => {
    console.log(`Server Berjalan Pada Port ${port}`);
})