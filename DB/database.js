var mysql = require('mysql2');
require('dotenv').config();

var con = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER,
  port: process.env.PORTSQL,
  password: process.env.PASSWORD,
  //database: process.env.DATABASE
});


exports.createDB = () => {
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "CREATE DATABASE jsonplaceholderDB;";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
  }

exports.createTableCustomers = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = String.raw`CREATE TABLE customers (
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      id INT,
      city VARCHAR(255),
      street VARCHAR(255),
      houseNumber VARCHAR(255),
      birthday DATE,
      phone INT,
      mobilePhone INT,
      DateOfReceivingAPositiveResult DATE,
      dateOfRecovery DATE
  );`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
}

exports.createTableVaccinations = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = String.raw`CREATE TABLE vaccinations (
    customerId int,
    date DATE,
    manufacturer VARCHAR(255)
  );`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
}
