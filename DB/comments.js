var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function addComment(comment) {
    const query = String.raw`
    INSERT INTO COMMENTS (postId, name, email, body)
    VALUES (${comment.postId}, '${comment.name}', '${comment.email}', '${comment.body}');
`;
    await connection.promise().query(query);
}

async function updateComment(comment, id) {
    const query = String.raw`
    UPDATE COMMENTS 
    SET name = '${comment.name}',
        email = '${comment.email}',
        body = '${comment.body}'
    WHERE id = ${id};
`;
    await connection.promise().query(query);
}

module.exports = { addComment, updateComment }