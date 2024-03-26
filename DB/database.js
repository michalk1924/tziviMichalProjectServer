var mysql = require('mysql2');
require('dotenv').config();

export var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const createDB = () => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE DATABASE jsonplaceholderDB;";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("database created");
        });
    });
}

const deleteTable = (tableName) => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `DROP TABLE ${tableName};`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
}

const createTableComments = async () => {
    try {
        var sql = String.raw
            `CREATE TABLE comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            postId INT,
            name VARCHAR(255),
            email VARCHAR(255),
            body TEXT,
            FOREIGN KEY (postId) REFERENCES posts(id)
        );
        `;
        await connection.query(sql);
        console.log('table messages created!');
    } catch (err) {
        console.log(err);
    }
}

const createTablePosts = async () => {
    try {
        var sql = String.raw
          `CREATE TABLE posts (
           id INT PRIMARY KEY AUTO_INCREMENT,
           userId INT,
           title VARCHAR(255),
           body TEXT,
           FOREIGN KEY (userId) REFERENCES users(id)
       )`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('table posts created!');
        });
    } catch (err) {
        console.log(err);
    }
}

const createTableAlbums = async () => {
    try {
        var sql = String.raw
        `CREATE TABLE albums (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT,
        title VARCHAR(255)
    );`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('table albums created!');
        });
        console.log('table albums created!');
    } catch (err) {
        console.log(err);
    }
}

const createTableUsers = async () => {
    try {
        var sql = String.raw
            `CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255),
            username VARCHAR(255),
            email VARCHAR(255),
            address_street VARCHAR(255),
            address_city VARCHAR(255),
            phone VARCHAR(255),
            website VARCHAR(255)
        );`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('table users created!');
        });
    } catch (err) {
        console.log(err);
    }
}

const createTablePhotos = async () => {
    try {
        var sql = String.raw
            `CREATE TABLE photos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            albumId INT,
            title VARCHAR(255),
            url VARCHAR(255),
            thumbnailUrl VARCHAR(255),
            FOREIGN KEY (albumId) REFERENCES albums(id)
        );`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('table photos created!');
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createDB, deleteTable, createTablePosts, createTableComments, createTableAlbums,
    createTableUsers, createTablePhotos
};
