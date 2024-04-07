
var mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    port: process.env.PORTSQL,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

async function getAll(type, typeId, id) {
    try {
        const query = String.raw
            `SELECT * FROM ${type} WHERE ${typeId} = ${id} `;
        const result = await connection.promise().query(query);
        return result;
        
    } catch (err) {
        console.error('Error getting todos:', err);
    }
}

async function deleteItem(type, id) {
    try{
        const query = String.raw
            `DELETE FROM ${type} WHERE id = ${id}`;
        connection.promise().query(query);
    }
    catch (err) {
        console.error('Error deleting todos:', err);
    }
}

module.exports = {getAll, deleteItem};