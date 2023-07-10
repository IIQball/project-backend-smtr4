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
  getTokoById : (req,res) => {
    const qstring = `SELECT * FROM akun_toko WHERE id = '${req.params.idToko}'`;
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
  editToko : (req, res) => {
    const id = req.params.id;
    const akuntoko = req.body;
    console.log(id)
    const qstring = `UPDATE akun_toko SET namaToko = '${akuntoko.namaToko}', username = '${akuntoko.username}', password = '${akuntoko.password}' WHERE idToko = '${id}'`;
    connection.query( qstring, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Terjadi kesalahan saaat UPDATE with idToko" + idToko,
        });
      } else if (data.affectedRows == 0) {
        res.status(404).send({
            message: `Not Found akun_toko with idToko ${id}`
        })
      } else {
        res.send({ id: id, ...akuntoko })
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
    const {namaToko, username, password,idUser} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log(req.body)
    const query = 'INSERT INTO akun_toko (idUser,namaToko, username, password) VALUES (?,?,?,?)'
    connection.query(query, [idUser,namaToko, username, hashedPassword], (err) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({
          message: err.message || "register gagal"
        });
      }
      else
          res.send({namaToko, username, hashedPassword})
    });
  },
};
