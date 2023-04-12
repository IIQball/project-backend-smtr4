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
    getTransaksibyId : (req,res) => {
        const qstring = `SELECT * FROM transaksi WHERE id = '${req.params.id}'`;
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
    insertTransaksi : (req,res) => {
        const transaksiBaru = req.body;
        connection.query("INSERT INTO transaksi SET ? ", transaksiBaru,(err) => {
            if (err) {
                console.log("error: ",err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat Insert data"
                });
            }
            else{
                res.send(transaksiBaru)
            }
        });
    },
    updateTransaksi : (req,res) => {
        const id = req.params.id;
        const Transaksi = req.body;
        const qstring = `UPDATE transaksi
                        SET tanggal = '${Transaksi.tanggal}', jenis_barang = '${Transaksi.jenis_barang}', nomer_barang = '${Transaksi.nomer_barang}', sisa_stok = '${Transaksi.sisa_stok}'
                        WHERE id = '${id}'`
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
    deleteTransaksi : (req,res) => {
        const id = req.params.id
        const qstring = `DELETE FROM transaksi WHERE id = '${id}'`
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Error deleting transaksi with id" + id
                });
            }
            else if (data.affectedRows == 0) {
                res.status(404).send({
                    message: `Not found transaksi with id ${id}.`
                });
            }
            else res.send(`transaksi dengan id = ${id} telah terhapus`)
        });
    }
}