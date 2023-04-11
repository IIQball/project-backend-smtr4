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
}