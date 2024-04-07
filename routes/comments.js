
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
    const result = await tools.getAll("comments", "postId", req.query.postId);
    res.send(result? result[0]: 0);
});

router.post('/', async (req, res) => {
    try {
        const comment = req.body;
        const query = String.raw`
            INSERT INTO COMMENTS (postId, name, email, body)
            VALUES (${comment.postId}, '${comment.name}', '${comment.email}', '${comment.body}');
        `;
        const result = await connection.promise().query(query);
        console.log('Comment added');
        res.send();
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Error adding comment');
    }
});

router.delete('/:id', async (req, res) => {
    await tools.deleteItem("comments", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const comment = req.body;
        const query = String.raw`
            UPDATE COMMENTS 
            SET name = '${comment.name}',
                email = '${comment.email}',
                body = '${comment.body}'
            WHERE id = ${req.params.id};
        `;
        await connection.promise().query(query);
        console.log('Comment updated');
        res.send();
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(500).send('Error updating comment');
    }
});


module.exports = router;