const connection = require('../db/db.js');

module.exports = {
    getAllStock : (req,res)=>{
        const idUser = req.params.idUser;
        const dbquery = `
        select stok_barang.idToko,akun_toko.namaToko, stok_barang.kodeBarang, data_barang.namaBarang,
        data_barang.ukuran, data_barang.harga, stok_barang.stok, data_barang.url
        from stok_barang
        inner join akun_toko on stok_barang.idToko = akun_toko.idToko
        inner join data_barang on stok_barang.kodeBarang = data_barang.kodeBarang
        where stok_barang.idUser = ${idUser};`;
        connection.query(dbquery,(err,data)=>{
            if (err){
                console.log("error : ", err);
                res.status(500).send({
                    message : err.message || "Terjadi error saat GET data"
                });
            }
            else res.send(data);
        });
    },
    getStockByToko : (req,res)=>{
        const idUser = req.params.idUser;
        const namaToko = req.params.namaToko;
        const dbquery = `
        select stok_barang.idToko, akun_toko.namaToko, stok_barang.kodeBarang, data_barang.namaBarang,
        data_barang.ukuran, data_barang.harga, stok_barang.stok, data_barang.url
        from stok_barang
        inner join akun_toko on stok_barang.idToko = akun_toko.idToko
        inner join data_barang on stok_barang.kodeBarang = data_barang.kodeBarang
        where stok_barang.idUser = ${idUser} and akun_toko.namaToko = "${namaToko}";`;
        connection.query(dbquery,(err,data)=>{
            if (err){
                console.log("error : ", err);
                res.status(500).send({
                    message : err.message || "Terjadi error saat GET data"
                });
            }
            else res.send(data);
        });
    },
    getListToko : (req,res) => {
        const idUser = req.params.idUser;
        const dbquery = `
        SELECT idToko,namaToko FROM akun_toko WHERE idUser = ${idUser}
        `;
        connection.query(dbquery, (err,data) => {
            if(err){
                console.log("error : ", err);
                res.status(500).send({
                    message : err.message
                })
            }
            else res.send(data);
        })
    },
    updateStok : (req,res) => {
        const idUser = req.params.idUser;
        const newData = req.body;
        const dbquery = `update stok_barang set stok = ${newData.stok} where idUser=${idUser} and idToko = ${newData.idToko} and kodeBarang="${newData.kodeBarang}";`
        connection.query(dbquery,(err,data)=>{
            if(err){
                res.status(500).send({
                    message : err.message
                });
            }
            else if(data.affectedRows == 0){
                res.status(404).send({
                    message : `Data not found.`
                });
            }
            else{
                console.log('stok updated : ',{idUser : idUser, ...newData});
                res.send({idUser : idUser, ...newData});
            }
        })
    },
    AddItem : (req, res) => {
        const idUser = req.params.idUser;
        const idToko = req.body.idToko;
        const kodeBarang = req.body.kodeBarang;
        const dbquery = `INSERT INTO stok_barang set idUser = ${idUser} , idToko = ${idToko}, kodeBarang = "${kodeBarang}", stok = 0`
        connection.query(dbquery,(err,data)=>{
            if(err){
                res.status(500).send({
                    message : err.message
                });
            }
            else if(data.affectedRows == 0){
                res.status(404).send({
                    message : `Data not found.`
                });
            }
            else{
                res.send('item berhasil ditambah : ');
            }
        })
    },
}
