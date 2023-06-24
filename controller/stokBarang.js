const connection = require('../db/db.js');

module.exports = {
    getAllStock : (req,res)=>{
        const idUser = req.params.idUser;
        const dbquery = `
        select akun_toko.namaToko, stok_barang.kodeBarang, data_barang.namaBarang,
        data_barang.ukuran, data_barang.harga, stok_barang.stok
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
}