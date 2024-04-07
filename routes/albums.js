
const express = require('express');
const router = express.Router();

const toolsDB = require('../DB/tools');
const albumsDB = require('../DB/albums');

router.get('/', async (req, res) => {
    try {
        const result = await toolsDB.getAll("albums", "userId", req.query.userId);
        res.send(result[0]);
    }
    catch (err) {
        console.error('Error getting albums:', err);
        res.status(500).send('Error getting albums');
    }
});

router.post('/', async (req, res) => {
    try {
        const album = req.body;
        await albumsDB.addAlbum(album);
        console.log('Album added');
        res.send();
    } catch (err) {
        console.error('Error adding album:', err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await toolsDB.deleteItem("albums", req.params.id);
        res.send();
    }
    catch (err) {
        console.error('Error deleting album:', err);
        res.status(500).send('Error deleting album');
    }
})

router.put('/:id', async (req, res) => {
    try {
        const album = req.body;

        res.send();
    }
    catch (err) {
        console.error('Error updating album:', err);
    }
})

module.exports = router;