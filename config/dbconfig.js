const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_demo",
});

con.connect((err) => {
    if (err) {
        console.log("Error!::)", err)
        throw err
    }
    else {
        console.log('Db connected!');
    }
});

module.exports = con.promise()