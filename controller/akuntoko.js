const connection = require('../db/db.js')

module.exports = {
    getAkunToko : (req,res) => {
        const qstring = "SELECT * FROM akuntoko";
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
    getAkunTokoById : (req,res) => {
        const qstring = `SELECT * FROM akuntoko WHERE id = '${req.params.id}'`;
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
    insertAkunToko : (req,res) => {
        const akuntokoBaru = req.body;
        connection.query("INSERT INTO akuntoko SET ? ", akuntokoBaru,(err) => {
            if (err) {
                console.log("error: ",err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat Insert data"
                });
            }
            else{
                res.send(akuntokoBaru)
            }
        });
    },
    updateAkunToko : (req,res) => {
        const id = req.params.id;
        const AkunToko = req.body;
        const qstring = `UPDATE akuntoko
                        SET nama_toko = '${AkunToko.nama_toko}', username = '${AkunToko.username}', password = '${AkunToko.password}'
                        WHERE id = '${id}'`
        connection.query(qstring, (err,data) => {
            if(err) {
                res.status(500).send({
                    message: err.message
                });
            }
            else if(data.affectedRows == 0){
                res.status(404).send({
                    message: `Not found akuntoko with id ${id}.`
                });
            }
            else {
                console.log("update akuntoko : ", {id: id, ...AkunToko});
                res.send({id: id, ...AkunToko});
            }     
        })
    },
    deleteAkunToko : (req,res) => {
        const id = req.params.id
        const qstring = `DELETE FROM akuntoko WHERE id = '${id}'`
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting akuntoko with id" + id
                });
            }
            else if (data.affectedRows == 0) {
                res.status(404).send({
                    message: `Not found akuntoko with id ${id}.`
                });
            }
            else res.send(`Akun Toko dengan id = ${id} telah terhapus`)
        });
    }
}