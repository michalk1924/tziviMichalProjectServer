
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
    const result = await tools.getAll("posts", "userId", req.query.userId);
    res.send(result? result[0]: []);
});

router.post('/', async (req, res) => {
    try {
        const post = req.body;
        const query = String.raw`
            INSERT INTO POSTS (userId, title, body)
            VALUES (${post.userId}, '${post.title}', '${post.body}');
        `;
        const result = await connection.promise().query(query);
        console.log('Post added');
        res.send();
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(500).send('Error adding post');
    }
});

router.delete('/:id', async (req, res) => {
    await tools.deleteItem("posts", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const post = req.body;
        const query = String.raw`
            UPDATE POSTS 
            SET title = '${post.title}',
                body = '${post.body}'
            WHERE id = ${req.params.id};
        `;
        await connection.promise().query(query);
        console.log('Post updated');
        res.send();
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Error updating post');
    }
});

module.exports = router;