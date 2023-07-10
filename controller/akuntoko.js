
const connection = require("../db/db.js");
const bcrypt = require("bcrypt");


module.exports = {
  getToko: (req, res) => {
    const qstring = "SELECT * FROM akun_toko";
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
  tambahToko: (req, res) => {
    const barangBaru = req.body;
    connection.query("insert into akun_toko set ?", barangBaru, (err) => {
      if (err) {
        console.log("error:", err);
        res.status(500).send({
          message: err.message || "Terjadi kesalahan saaat insert data",
        });
      } else {
        res.send(barangBaru);
      }
    });
  },
  hapusToko: (req, res) => {
    const id = req.params.id;
    const qstring = `DELETE FROM akun_toko WHERE idToko = '${id}'`;
    connection.query(qstring, (err, data) => {
      if (err) {
        res.status(500).send({
          message: "error deleteing barang with id " + id,
        });
      } else if (data.affectedRows == 0) {
        res.status(404).send({
          message: `not found barang with id ${id}`,
        });
      } else {
        res.send(`barang dengan id = ${id} telah dihapus`);
      }
    });
  },
  register: (req, res) => {
    const {namaToko, username, password} = req.body;
    const idUser = req.params.idUser;
    const query = 'INSERT INTO akun_toko (idUser, namaToko, username, password) VALUES (?,?,?,?)'
    connection.query(query, [idUser,namaToko, username, password], (err) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({
          message: err.message || "register gagal"
        });
      }
      else
          res.send({namaToko, username, password})
    });
  },
  login: (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const qstring = `SELECT * FROM akun_toko WHERE username = "${username}"`;
    console.log(req.body)
    connection.query(qstring,(err,data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat get data"
            });
        }
        else if(data.length > 0 ){
            bcrypt.compareSync(password, data[0].password)
        
            req.session.isAuhenticated = true;
            res.send({status : "Login Sukses" })
            
        }else {
            res.send("Anda Belum Terdaftar")
        }
    });
},
};
