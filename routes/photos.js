
const express = require('express');
const router = express.Router();

const toolsDB = require('../DB/tools');
const photosDB = require('../DB/photos.js');

router.get('/', async (req, res) => {
    const albumId = req.query.albumId;
    const _limit = parseInt(req.query._limit);
    const _start = parseInt(req.query._start);
    const result = await toolsDB.getAll("photos", "albumId", albumId);
    if(_limit !=null && _start!=null) {
        const sliceResult = result[0].slice(_start, _start + _limit);
        res.send(result? sliceResult : [])
    }
    else res.send(result ? result[0] : []);
});

router.post('/', async (req, res) => {
    try {
        const photo = req.body;
        await photosDB.addPhoto(photo);
        console.log('Photo added');
        res.send();
    } catch (err) {
        console.error('Error adding photo:', err);
        res.status(500).send('Error adding photo');
    }
});

router.delete('/:id', async (req, res) => {
    await toolsDB.deleteItem("photos", req.params.id);
    res.send();
})

router.put('/:id', async (req, res) => {
    try {
        const photo = req.body;
        await photosDB.updatePhoto(photo, req.params.id);
        console.log('Photo updated');
        res.send();
    } catch (err) {
        console.error('Error updating photo:', err);
        res.status(500).send('Error updating photo');
    }
});

module.exports = router;