
var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const express = require('express');
const router = express.Router();

const tools = require('./tools');

router.get('/', async (req, res) => {
    const result = await tools.getAll("photos", "albumId", req.query.userId);
    res.send(result? result[0]: []);
});

router.post('/', async (req, res) => {
    try {
        const photo = req.body;
        const query = String.raw`
            INSERT INTO PHOTOS (albumId, title, url, thumbnailUrl)
            VALUES (${photo.albumId}, '${photo.title}', '${photo.url}', '${photo.thumbnailUrl}');
        `;
        const result = await connection.promise().query(query);
        console.log('Photo added');
        res.send();
    } catch (err) {
        console.error('Error adding photo:', err);
        res.status(500).send('Error adding photo');
    }
});

router.delete('/:id', async (req, res) => {
    await tools.deleteItem("photos", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const photo = req.body;
        const query = String.raw`
            UPDATE PHOTOS 
            SET title = '${photo.title}',
                url = '${photo.url}',
                thumbnailUrl = '${photo.thumbnailUrl}'
            WHERE id = ${req.params.id};
        `;
        await connection.promise().query(query);
        console.log('Photo updated');
        res.send();
    } catch (err) {
        console.error('Error updating photo:', err);
        res.status(500).send('Error updating photo');
    }
});

module.exports = router;