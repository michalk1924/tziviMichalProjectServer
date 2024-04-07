var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function addPost(post) {
    const query = String.raw`
    INSERT INTO POSTS (userId, title, body)
    VALUES (${post.userId}, '${post.title}', '${post.body}');
`;
    await connection.promise().query(query);
}

async function updatePost(post, id) {
        const query = String.raw`
            UPDATE POSTS 
            SET title = '${post.title}',
                body = '${post.body}'
            WHERE id = ${id};
        `;
        await connection.promise().query(query);
}

module.exports = { addPost, updatePost }