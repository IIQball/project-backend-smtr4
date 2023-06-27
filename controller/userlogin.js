const connection = require('../db/db.js');
const bcrypt = require ('bcrypt');

module.exports = {
    Login: (req, res) => {
        const username = req.body.username
        const password = req.body.password

        const qstring = `SELECT * FROM user WHERE username = "${username}"`;
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
    register: (req,res) => {
        const { username, password ,noHp, email} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const query = 'INSERT INTO user (username, password, noHp, email) VALUES (?, ?, ?, ?)'

        connection.query(query, [username, hashedPassword, noHp, email], (err) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "registrasi gagal"
                });
            }
            else 
                res.send({ username, hashedPassword , noHp, email})
        }); 
    },
    logout: (req, res) => {
        // mengahapus session pengguna
        req.session.destroy((err) => {
            if (err) {
                console.logout(err);
            } else {
                res.send('Logout');
            }
        });
    },
}



