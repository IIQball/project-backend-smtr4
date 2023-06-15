const connection = require('../db/db.js')

module.exports = {
    getlistbarang : (req,res) => {
        const qstring = "SELECT * FROM listbarang";
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
    getlistbarangbyId : (req,res) => {
        const qstring = `SELECT * FROM listbarang WHERE id = '${req.params.id}'`;
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
    insertlistbarang : (req,res) => {
        const listbarangBaru = req.body;
        connection.query("INSERT INTO listbarang SET ? ", listbarangBaru,(err) => {
            if (err) {
                console.log("error: ",err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat Insert data"
                });
            }
            else{
                res.send(listbarangBaru)
            }
        });
    },
    updatelistbarang : (req,res) => {
        const id = req.params.id;
        const listbarang = req.body;
        const qstring = `UPDATE listbarang
                        SET nama_barang = '${listbarang.nama_barang}', kategori = '${listbarang.kategori}', harga_barang = '${listbarang.harga_barang}'
                        WHERE id = '${id}'`
        connection.query(qstring, (err,data) => {
            if(err) {
                res.status(500).send({
                    message: err.message
                });
            }
            else if(data.affectedRows == 0){
                res.status(404).send({
                    message: `Not found listbarang with id ${id}.`
                });
            }
            else {
                console.log("update listbarang : ", {id: id, ...listbarang});
                res.send({id: id, ...listbarang});
            }     
        })
    },
    deletelistbarang : (req,res) => {
        const id = req.params.id
        const qstring = `DELETE FROM listbarang WHERE id = '${id}'`
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting listbarang with id" + id
                });
            }
            else if (data.affectedRows == 0) {
                res.status(404).send({
                    message: `Not found listbarang with id ${id}.`
                });
            }
            else res.send(`listbarang dengan id = ${id} telah terhapus`)
        });
    }
}