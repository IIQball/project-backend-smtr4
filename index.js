const express = require('express');
const app = express();
const port = 5000;

const routerAkunToko = require('./routes/akuntoko')

// Untuk menerima req.body
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(routerAkunToko)

app.listen(port,() => {
    console.log(`Server Berjalan Pada Port ${port}`);
})