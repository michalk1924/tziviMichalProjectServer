
const express = require('express');
const router = express.Router();

const toolsDB = require('../DB/tools');
const postsDB = require('../DB/posts');

router.get('/', async (req, res) => {
    const result = await toolsDB.getAll("posts", "userId", req.query.userId);
    res.send(result? result[0]: []);
});

router.post('/', async (req, res) => {
    try {
        const post = req.body; 
        await postsDB.addPost(post);
        console.log('Post added');
        res.send();
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(500).send('Error adding post');
    }
});

router.delete('/:id', async (req, res) => {
    await toolsDB.deleteItem("posts", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const post = req.body;
        await postsDB.updatePost(post, req.params.id)
        console.log('Post updated');
        res.send();
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Error updating post');
    }
});

module.exports = router;