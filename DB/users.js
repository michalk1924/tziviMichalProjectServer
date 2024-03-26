var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "MKmk1924",
  database: "mydb"
});

exports.createTableCustomers = () => {
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = `CREATE DATABASE internet_database;`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
  }
