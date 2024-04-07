
const express = require('express');
const router = express.Router();

const toolsDB = require('../DB/tools');
const todosDB = require('../DB/todos');

router.get('/', async (req, res) => {
    const result = await toolsDB.getAll("todos", "userId", req.query.userId);
    res.send(result[0]);
});

router.post('/', async (req, res) => {
    try {
        const todo = req.body;
        await todosDB.addTodo(todo);
        console.log('Todo added');
        res.send();
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).send('Error adding todo');
    }
});

router.delete('/:id', async (req, res) => {
    await toolsDB.deleteItem("todos", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const todo = req.body;
        await todosDB.updateTodo(todo, req.params.id);
        console.log('Todo updated');
        res.send();
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).send('Error updating todo');
    }
});

module.exports = router;