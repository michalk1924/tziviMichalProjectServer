
import connection from './DB/database';

const addTodo = async (todo) =>{
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
}

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

module.exports = { addTodo, createTableTodos };