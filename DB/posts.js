var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function addPost(todo) {
    const query = String.raw`
    INSERT INTO POSTS (userId, title, body)
    VALUES (${post.userId}, '${post.title}', '${post.body}');
`;
    await connection.promise().query(query);
}

async function updateTodo(todo) {
    const query = String.raw`
    UPDATE TODOS 
    SET title = '${todo.title}',
        completed = ${todo.completed ? 1 : 0}
    WHERE id = ${req.params.id};
`;
    await connection.promise().query(query);
    console.log('Todo updated');
}

module.exports = { addTodo, updateTodo }