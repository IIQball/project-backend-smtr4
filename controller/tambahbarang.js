const connection = require("../db/db.js");
const path = require('path')

module.exports = {
  getBrg: (req, res) => {
    const qstring = "SELECT * FROM data_barang";
    connection.query(qstring, (err, data) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({
          message: err.message || "Terjadi kesalahan saat get data"
        });
      } 
      else res.send(data)
    });
  },
  getByKodeBrg: (req, res) => {
    const qstring = `SELECT * FROM data_barang WHERE kodeBarang = '${req.params.kodeBarang}'`;
    connection.query(qstring, (err, data) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({
          message: err.message || "Terjadi kesalahan saat get data",
        });
      } else {
        res.send(data);
      }
    });
  },
  tambahBrg: (req, res) => {
      const kodeBarang = req.body.kodeBarang
      const namaBarang = req.body.namaBarang
      const harga = req.body.harga
      const ukuran = req.body.ukuran

       // upload Gambar
       const gambar = req.files.gambar
       const extension = path.extname(gambar.name)
       const gambarNama = gambar.md5 + extension
       const url = `${req.protocol}://${req.get('host')}/images/${gambarNama}`
       console.log(url)
 
       const allowTypes = ['.png', '.jpg', '.jpeg']
 
       if (!allowTypes.includes(extension.toLowerCase())) return res.status(422).json({msg: 'File Tidak Valid'})

       if (req.files === null) return res.status(400).json({msg : 'File Tidak Di Upload'})

      //  `insert into data_barang (kodeBarang, namaBarang, harga, gambar, ukuran) values ('${kodeBarang}','${namaBarang}','${harga}','${gambarNama}','${ukuran}'`

      gambar.mv(`./public/images/${gambarNama}`, async(err) =>{
          if (err) return res.status(500).json({msg : err.message})
          try {
            connection.query(`insert into data_barang set kodeBarang = '${kodeBarang}', namaBarang = '${namaBarang}', harga = '${harga}', gambar = '${gambarNama}',ukuran = '${ukuran}',url ='${url}'`,(err,data) => {
              if(err) {
                console.log('error',err)
                res.status(500).send({
                  msg : err.message || "Terjadi Kesalahan"
                })
              } else{
                res.send({kodeBarang, namaBarang, harga, gambarNama, ukuran})
                console.log({gambarNama})
              }
            })
          } catch (error) {
              console.log(error.message)     
          }
      })
    },

    
  //   const barangBaru = req.body;
  //   connection.query("insert into data_barang set ?", barangBaru, (err) => {
  //     if (err) {
  //       console.log("error:", err);
  //       res.status(500).send({
  //         message: err.message || "Terjadi kesalahan saaat insert data",
  //       });
  //     } else {
  //       res.send(barangBaru);
  //     }
  //   });
  // },
  updateBrg: (req, res) => {
    const kode = req.params.kode;
    const brg = req.body;
    const qstring = `UPDATE data_barang SET 
    kodeBarang = '${brg.kodeBarang}', 
    namaBarang = '${brg.namaBarang}', 
    harga = '${brg.harga}', 
    gambar = '${brg.gambar}', 
    ukuran = '${brg.ukuran}'
    WHERE kodeBarang = '${kode}'`;
    connection.query(qstring, (err, data) => {
      if (err) {
        res.status(500).send({
          message: "error updating barang with kode " + kode,
        });
      } else if (data.affectedRows == 0) {
        res.status(404).send({
          message: `not found barang with kode ${kode}`,
        });
      } else {
        console.log("update barang : ", { kode: kode, ...brg });
        res.send({ kode: kode, ...brg });
      }
    });
  },
  hapusBrg: (req, res) => {
    const kode = req.params.kode;
    const qstring = `DELETE FROM data_barang WHERE kodeBarang = '${kode}'`;
    connection.query(qstring, (err, data) => {
      if (err) {
        res.status(500).send({
          message: "error deleteing barang with kode " + kode,
        });
      } else if (data.affectedRows == 0) {
        res.status(404).send({
          message: `not found barang with kode ${kode}`,
        });
      } else {
        res.send(`barang dengan kode = ${kode} telah dihapus`);
      }
    });
  },
};
