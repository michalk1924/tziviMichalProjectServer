
var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER,
  port: process.env.PORTSQL,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

async function getUserById(id) {
  const query = String.raw
    `SELECT * FROM users WHERE id = ${id} `;
  const result = await connection.promise().query(query);
  const user = result[0][0]
  if (user != null) {
    user.address = {}
    user.address.street = user.address_street ?? ''
    user.address.city = user.address_city ?? ''
    delete user.address_street;
    delete user.address_city;
    return user;
  }
  else
    return null;
}

async function getUserUsername(username) {
  const query = String.raw
    `SELECT * FROM users WHERE username = '${username}' `;
  const result = await connection.promise().query(query);
  const user = result[0][0]
  if (user != null) {
    user.address = {}
    user.address.street = user.address_street ?? ''
    user.address.city = user.address_city ?? ''
    delete user.address_street;
    delete user.address_city;
    return user;
  }
  else
    return null;
}

async function addUser(todo) {
  const query = String.raw`
            INSERT INTO TODOS (userId, title, completed)
            VALUES (${todo.userId}, '${todo.title}', ${todo.completed ? 1 : 0});
        `;
  await connection.promise().query(query);
}

async function updateUser(user, id) {
  const query = String.raw`
  UPDATE USERS 
  SET name = '${user.name}',
      username = '${user.username}',
      email = '${user.email}',
      address_street = '${user.address_street}',
      address_city = '${user.address_city}',
      phone = '${user.phone}',
      website = '${user.website}'
  WHERE id = ${id};
`;
  await connection.promise().query(query);
}

async function login(username, password) {
  const query = String.raw`
            SELECT passwords.password
            from passwords natural join users
            where users.username = '${username}'
        `;
  const result = await connection.promise().query(query);
  if (password == result[0][0].password)
    return true;
  else return false;
}

module.exports = { addUser, updateUser, getUserById, getUserUsername, login }