
var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function addPhoto(photo) {
    const query = String.raw`
            INSERT INTO PHOTOS (albumId, title, url, thumbnailUrl)
            VALUES (${photo.albumId}, '${photo.title}', '${photo.url}', '${photo.thumbnailUrl}');
        `;
    await connection.promise().query(query);
}

async function updatePhoto(photo, id) {
    const query = String.raw`
    UPDATE PHOTOS 
    SET title = '${photo.title}',
        url = '${photo.url}',
        thumbnailUrl = '${photo.thumbnailUrl}'
    WHERE id = ${id};
`;
    await connection.promise().query(query);
}

module.exports = { addPhoto, updatePhoto }

