
const express = require('express');
const router = express.Router();

const toolsDB = require('../DB/tools');
const usersDB = require('../DB/users');

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await usersDB.getUserById(id);
        res.send(JSON.stringify(result));
    } catch (err) {
        console.error('Error getting user:', err);
    }
});

router.get('/', async (req, res) => {
    try {
        const username = req.query.username;
        const result = await usersDB.getUserUsername(username);
        res.send(JSON.stringify(result));

    } catch (err) {
        console.error('Error getting user:', err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const { name, username, email, address, phone, website } = user;
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
    await toolsDB.deleteItem("users", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const user = req.body;
        await usersDB.updateUser(user, req.params.id);
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
        const password = req.body.password;
        const result = await usersDB.login(username, password);      
        res.send(result);
    } catch (err) {
        console.error('Error', err);
        res.status(500).send('Error');
    }
});

module.exports = router;