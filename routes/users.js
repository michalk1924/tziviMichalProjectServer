
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

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = String.raw
            `SELECT * FROM users WHERE id = ${id} `;
        const result = await connection.promise().query(query);
        const user = result[0][0]
        if(user!=null)
        {
            user.address = {}
            user.address.street = user.address_street ?? ''
            user.address.city = user.address_city ?? ''
            delete user.address_street;
            delete user.address_city;
            res.send(JSON.stringify(user));
        }
        else
            res.send(JSON.stringify(null));
    } catch (err) {
        console.error('Error getting user:', err);
    }
});

router.get('/', async (req, res) => {
    try {
        const username = req.query.username;
        const query = String.raw
            `SELECT * FROM users WHERE username = '${username}' `;
        const result = await connection.promise().query(query);
        const user = result[0][0]
        if(user!=null)
        {
            user.address = {}
            user.address.street = user.address_street ?? ''
            user.address.city = user.address_city ?? ''
            delete user.address_street;
            delete user.address_city;
            res.send(JSON.stringify(user));
        }
        else
            res.send(JSON.stringify(null));
 
    } catch (err) {
        console.error('Error getting user:', err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const { name, username, email, address, phone, website } =user;
        address_street = address.street
        address_city = address.city
        const query = `INSERT INTO users (name, username, email, address_street, address_city, phone, website) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, username, email, address_street, address_city, phone, website];
        const result = await connection.promise().query(query, values);
        user.id = result[0].insertId;
        console.log('User added:', user);
        res.status(200).json(user);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Error adding user');
    }
});

router.delete('/:id', async (req, res) => {
    await tools.deleteItem("users", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const user = req.body;
        const query = String.raw`
            UPDATE USERS 
            SET name = '${user.name}',
                username = '${user.username}',
                email = '${user.email}',
                address_street = '${user.address_street}',
                address_city = '${user.address_city}',
                phone = '${user.phone}',
                website = '${user.website}'
            WHERE id = ${req.params.id};
        `;
        await connection.promise().query(query);
        console.log('User updated');
        res.send();
    }
    catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
    }
});

router.post('/login', async (req, res) => {
    try {
        const username = req.query.username;
        const query = String.raw`
            SELECT passwords.password
            from passwords natural join users
            where users.username = '${username}'
        `;
        const result = await connection.promise().query(query);
        if (req.body.password == result[0][0].password)
            res.send(true);
        else res.send(false);
    } catch (err) {
        console.error('Error', err);
        res.status(500).send('Error');
    }
});

module.exports = router;