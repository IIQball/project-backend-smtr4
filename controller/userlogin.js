const connection = require('../db/db.js');
const bcrypt = require('bcrypt');

module.exports = {
    Login: (req, res) => {
        const username = req.body.username
        const password = req.body.password

        const qstring = `SELECT * FROM user WHERE username = '${username}'`;
        connection.query(qstring,(err,data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat get data"
                });
            }
            else if(data.length > 0 &&
                bcrypt.compareSync(password, data[0].password))
            {
                req.session.isAuhenticated = true;
                res.send("Login Sukses")
            }
            else {
                res.send("Anda Belum Terdaftar")
            }
        });
    },
    logout: (req, res) => {
        // mengahapus session pengguna
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.send('Logout');
            }
        });
    },
}