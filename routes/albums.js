
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

const tools = require('../DB/tools');

router.get('/', async (req, res) => {
    const result = await tools.getAll("albums", "userId", req.query.userId);
    res.send(result[0]);
});

router.post('/', async (req, res) => {
    try {
        const album = req.body;
        const query = String.raw
            `INSERT INTO albums (userId, title)
          VALUES (${album.userId}, '${album.title}');`;
        const result = await connection.promise().query(query);
        console.log('Album added');
        res.send();
    } catch (err) {
        console.error('Error adding album:', err);
    }
})

router.delete('/:id', async (req, res) => {
    await tools.deleteItem("albums", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const album = req.body;
        const query = String.raw
            `UPDATE albums SET title = '${album.title}' WHERE id = ${req.params.id};`;
        await connection.promise().query(query);
        console.log('Album updated');
        res.send();
    }
    catch (err) {
        console.error('Error updating album:', err);
    }
})

module.exports = router;