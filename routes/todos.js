
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
    const result = await tools.getAll("todos", "userId", req.query.userId);
    console.log(result);
    res.send(result[0]);
});

router.post('/', async (req, res) => {
    try {
        const todo = req.body;
        const query = String.raw`
            INSERT INTO TODOS (userId, title, completed)
            VALUES (${todo.userId}, '${todo.title}', ${todo.completed ? 1 : 0});
        `;
        const result = await connection.promise().query(query);
        console.log('Todo added');
        res.send();
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).send('Error adding todo');
    }
});

router.delete('/:id', async (req, res) => {
    await tools.deleteItem("todos", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const todo = req.body;
        const query = String.raw`
            UPDATE TODOS 
            SET title = '${todo.title}',
                completed = ${todo.completed ? 1 : 0}
            WHERE id = ${req.params.id};
        `;
        await connection.promise().query(query);
        console.log('Todo updated');
        res.send();
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).send('Error updating todo');
    }
});


module.exports = router;