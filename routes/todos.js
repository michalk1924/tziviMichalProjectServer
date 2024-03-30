
//import connection from './DB/database';
const express = require('express');
//const db = require()
const router = express.Router();
var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const createTableTodos = async () => {
    try {
       var sql = String.raw
        `CREATE TABLE todos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            userId INT,
            title VARCHAR(255),
            completed BOOLEAN
        );`;
       connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('table todos created!');
       });
   } catch (err) {
       console.log(err);
   }
}

router.get('/?userId', async (req, res) => {
return getAll(req.query.userId, res);
});

async function getAll(type, typeId, id)
{
    try {
        const query = String.raw
         `SELECT * FROM ${type} WHERE ${typeId} = ${id}`;
        const result = await connection.query(query);
        res.send(result.rows);
    } catch (err) {
        console.error('Error getting todos:', err);
    }
}

router.post('/?userId', async (req, res) => {
    try {
        const query = String.raw
         `INSERT INTO todos (title, completed, userId)
          VALUES (${todo.title}, ${todo.completed}, ${todo.userId})`;
        const values = [userId, title, completed];
        const result = await connection.query(query, values);
        console.log('Todo added:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error adding todo:', err);
    }
})

module.exports = router;