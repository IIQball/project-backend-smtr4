const connection = require('../db/db.js')



module.exports = {
    getTransaksi : (req,res) => {
        const qstring = "SELECT * FROM transaksi";
        connection.query(qstring, (err,data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat ke GET data"
                });
            }
            else res.send(data)
        });
    },
    getTransaksiBynomorStruk :(req, res) => {
        const nomorStruk = req.params.nomorStruk;
        const qstring=`SELECT * FROM transaksi WHERE nomorStruk = '${nomorStruk}'`;
        connection.query(qstring, (err,data) => {
            if (err) {
                console.log("error",err); 
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat ke GET data"
                })
            }
            else res.send(data)
        })
    },

    // insertTransaksi : (req,res) => {
    //     const data = req.body.data;
    //     let query = "INSERT INTO transaksi (nomorStruk, idToko, idUser, kodeBarang, qty,tanggal) VALUES ";
    //     const currentDate = new Date();
    //     const currentTime = currentDate.toISOString();
    //     const values = data.map(item => `('TK1-5JUN23-1', 1, 1, '${item.kodeBarang}', '${item.stok}','${currentTime}')`).join(',');
        
    //     query += values ;
        
    //     connection.query(query,(err) => {
    //       if (err) {
    //         console.log("error: ", err);
    //         res.status(500).send({
    //           message: err.message || "Terjadi kesalahan saat Insert data"
    //         });
    //       } else {
    //         res.send('Transaksi berhasil ditambahkan');
    //       }
    //     });

    //  },
    insertTransaksi: (req, res) => {
    const data = req.body.data;
    let query = "INSERT INTO transaksi (nomorStruk, idToko, idUser, kodeBarang, qty, tanggal) VALUES ";
    const currentDate = new Date();
    const currentTime = currentDate.toISOString();
    const values = data
    .map(
      (item) =>
        `('TK1-5JUN23-1', 1, 1, '${item.kodeBarang}', '${item.stok}', '${currentTime}')`
    )
    .join(",");

  query += values;

  connection.query(query, (err) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat Insert data",
      });
    } else {
      // Mengurangi stok barang dari cart
      const updateStockQuery = `UPDATE stok_barang SET stok = stok - ? WHERE kodeBarang = ?`;
      data.forEach((item) => {
        const { stok, kodeBarang } = item;
        connection.query(updateStockQuery, [stok, kodeBarang], (err, result) => {
          if (err) {
            console.log("error: ", err);
            return;
          }
          console.log(`Stok barang ${kodeBarang} berhasil dikurangi`);
        });
      });

      res.send("Transaksi berhasil ditambahkan");
    }
  });
},

    // insertTransaksi : (req,res) => {
    //     const data = req.body.data;
    //     let query = "INSERT INTO transaksi (nomorStruk, idToko, idUser, kodeBarang, qty) VALUES ";
        
    //     const values = data.map(item => `('${new Date().toDateString()}', 1, 1, '${item.kodeBarang}', ${item.stok})`).join(',');
        
    //     query += values;
        
    //     connection.query(query, (err) => {
    //       if (err) {
    //         console.log("error: ", err);
    //         res.status(500).send({
    //           message: err.message || "Terjadi kesalahan saat Insert data"
    //         });
    //       } else {
    //         res.send('Transaksi berhasil ditambahkan');
    //       }
    //     });

    // },
    updateTransaksi : (req,res) => {
        const Transaksi = req.body;
        const qstring = `UPDATE transaksi
                        SET nomorStruk = '${Transaksi.nomorStruk}', idUser = '${Transaksi.idUser}', idToko = '${Transaksi.idToko}', kodeBarang = '${Transaksi.kodeBarang}', qty='${Transaksi.qty}', tanggal= '${Transaksi.tanggal}
                        WHERE id = '${idUser}'`
        connection.query(qstring, (err,data) => {
            if(err) {
                res.status(500).send({
                    message: err.message
                });
            }
            else if(data.affectedRows == 0){
                res.status(404).send({
                    message: `Not found transaksi with id ${id}.`
                });
            }
            else {
                console.log("update transaksi : ", {id: id, ...Transaksi});
                res.send({id: id, ...Transaksi});
            }     
        })
    },
    updateTransaksiBynomorStruk : (req, res) => {
        const nomorStruk = req.params.nomorStruk;
        const transaksi = req.body;
        const qstring = `UPDATE transaksi SET idToko = '${transaksi.idToko}', idUser = '${transaksi.idUser}', kodeBarang = '${transaksi.kodeBarang}', qty = '${transaksi.qty}', tanggal = '${transaksi.tanggal}' WHERE nomorStruk = '${nomorStruk}'`;
            connection.query(qstring, (err,data) => {
                if(err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                else if(data.affectedRows == 0){
                    res.status(404).send({
                        message: `Not found transaksi with id ${nomorStruk}.`
                    });
                }
                else {
                    console.log("update transaksi : ", {nomorStruk: nomorStruk, ...transaksi});
                    res.send({nomorStruk: nomorStruk, ...transaksi});
                }     
            })
    },
    deleteTransaksiBynomorStruk : (req,res) => {
        const nomorStruk = req.params.nomorStruk
        const qstring = `DELETE FROM transaksi WHERE nomorStruk = '${nomorStruk}'`
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting transaksi with nomorStruk" + nomorStruk
                });
            }
            else if (data.affectedRows == 0) {
                res.status(404).send({
                    message: `Not found transaksi with id ${nomorStruk}.`
                });
            }
            else res.send(`transaksi dengan nomorStruk = ${nomorStruk} telah terhapus`)
        });
    },
    kurangiStok : (req,res) => {
        const kodeBarang = req.params.kodeBarang
        const qstring = `UPDATE stok_barang SET stok = stok-1 WHERE kodeBarang = '${kodeBarang}' `
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error " + err
                });
            }
            else if (data.affectedRows == 0) {
                res.status(404).send({
                    message: `Not found stok with kode barang.`
                });
            }
            else res.send(`update stok dari kode Barang= ${kodeBarang} telah terupdate`)
        });

    }
}