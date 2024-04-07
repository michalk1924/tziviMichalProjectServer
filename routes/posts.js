
const express = require('express');
const router = express.Router();

const toolsDB = require('../DB/tools');
const postsDB = require('../DB/posts');

router.get('/', async (req, res) => {
    try {
        const result = await toolsDB.getAll("posts", "userId", req.query.userId);
        res.send(result ? result[0] : []);
    }
    catch (err) {
        console.error('Error getting posts:', err);
        res.status(500).send('Error getting posts');
    }
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
    try {
        await toolsDB.deleteItem("posts", req.params.id);
        res.send();
    }
    catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Error deleting post');
    }
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