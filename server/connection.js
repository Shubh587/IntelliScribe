const mySQL = require('mysql2');

const db = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "$Hsa31230",
    database: "intelliscribe_db",
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to database!");
    }
});

module.exports = db;   