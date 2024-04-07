
var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function addAlbum(album) {
    const query = String.raw
        `INSERT INTO albums (userId, title)
          VALUES (${album.userId}, '${album.title}');`;
    await connection.promise().query(query);
}

async function updateAlbum(album, id) {
    const query = String.raw
        `UPDATE albums SET title = '${album.title}' WHERE id = ${id};`;
    await connection.promise().query(query);
    console.log('Album updated');
}

module.exports = { addAlbum, updateAlbum }
