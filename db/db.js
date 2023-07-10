const mysql = require("mysql")

// Create a Connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port : '3306',
    password : '',
    database: 'db_toko'
});

// open the Mysql connection
connection.connect(error => {
    if (error) throw error;
    console.log("Succesfully connected to the database");
});

module.exports = connection;