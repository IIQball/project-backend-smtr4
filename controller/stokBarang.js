const connection = require('../db/db.js');

module.exports = {
    getStokBarang : (req,res)=>{
        const dbquery = "SELECT * FROM stok_barang";
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
    getStokToko : (req,res)=>{
        const dbquery = "SELECT * FROM stok_barang";
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
    getByID : (req,res)=>{
        const idProduk = req.params.id;
        const dbquery = `SELECT * FROM stok_barang WHERE id_produk = '${idProduk}'`;
        connection.query(dbquery,(err,data)=>{
            if (err){
                console.log("error : ", err);
                res.status(500).send({
                    message : err.message || `Terjadi error saat GET data barang dengan id '${idProduk}'`
                })
            }
            else res.send(data);
        });
    },
    inputData : (req,res)=>{
        const dataBarang = req.body;
        const dbquery = "INSERT INTO stok_barang SET ?";
        connection.query(dbquery,dataBarang,(err)=>{
            if (err){
                console.log("error : ", err);
                res.status(500).send({
                    message : err.message || "Terjadi error saat input data"
                })
            }
            else res.send(dataBarang);
        });
    },
    editData : (req,res)=>{
        const idProduk = req.params.id;
        const dataBarang = req.body;
        const dbquery = `UPDATE stok_barang SET nama_barang = '${dataBarang.nama_barang}', kategori = '${dataBarang.kategori}', harga = '${dataBarang.harga}', jumlah = '${dataBarang.jumlah}' WHERE id_produk = '${idProduk}'`;
        connection.query(dbquery,(err)=>{
            if(err){
                console.log("error : ", err);
                res.status(500).send({
                    message : err.message || `Terjadi error saat update data barang dengan id '${idProduk}'`
                })
            }
            else{
                console.log("update data barang : ", {id_produk: idProduk, ...dataBarang});
                res.send({id_produk: idProduk, ...dataBarang});
            }
        })
    },
    delData : (req,res)=>{
        const idProduk = req.params.id;
        const dbquery = `DELETE FROM stok_barang WHERE id_produk = '${idProduk}'`
        connection.query(dbquery,(err)=>{
            if(err){
                console.log("error : ",err);
                res.status(500).send({
                    message : err.message || `Terjadi error saat ingin menghapus data dengan id '${idProduk}'`
                })
            }
            else{
                res.send(`Berhasil Menghapus data dengan id '${idProduk}' dari Database`);
            }
        });
    }
}