
var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function addTodo(todo) {
    const query = String.raw`
            INSERT INTO TODOS (userId, title, completed)
            VALUES (${todo.userId}, '${todo.title}', ${todo.completed ? 1 : 0});
        `;
    const result = await connection.promise().query(query);
}

async function updateTodo(todo) {
    const query = String.raw`
    UPDATE TODOS 
    SET title = '${todo.title}',
        completed = ${todo.completed ? 1 : 0}
    WHERE id = ${todo.id};
`;
    await connection.promise().query(query);
}

module.exports = {addTodo, updateTodo}

