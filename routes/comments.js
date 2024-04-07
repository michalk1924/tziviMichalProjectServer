
const express = require('express');
const router = express.Router();

const toolsDB = require('../DB/tools');
const commentsDB = require('../DB/comments');

router.get('/', async (req, res) => {
    try {
        const result = await toolsDB.getAll("comments", "postId", req.query.postId);
        res.send(result ? result[0] : 0);
    }
    catch (err) {
        console.error('Error getting comments:', err);
        res.status(500).send('Error getting comments');
    }
});

router.post('/', async (req, res) => {
    try {
        const comment = req.body;
        await commentsDB.addCooment(comment);
        console.log('Comment added');
        res.send();
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Error adding comment');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await toolsDB.deleteItem("comments", req.params.id);
        res.send();
    }
    catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).send('Error deleting comment');
    }
})

router.put('/:id', async (req, res) => {
    try {
        const comment = req.body;
        await commentsDB.updateComment(comment, req.params.id);
        console.log('Comment updated');
        res.send();
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(500).send('Error updating comment');
    }
});

module.exports = router;