const express = require('express');
const router = express.Router();
const db = require('../db')
var ObjectId = require('mongodb').ObjectId;

router.get('/', async function (req, res, next) {
    try {
        const collection = await db.getUsersCollection();
        const users = await collection.find({}).toArray()
        res.status(200).send({users})
    } catch (err) {
        console.error(err)
        res.status(500).send({error: "Error"})
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const collection = await db.getUsersCollection();
        const user = await collection.findOne({_id: ObjectId(req.params.id)})
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send({error: "Error"})
    }
});

router.post('/', async function (req, res, next) {
    const collection = await db.getUsersCollection();
    const result = await collection.insertOne(req.body)
    if (!result.acknowledged) {
        throw new Error("user write failed")
    }

    return res.status(200).send({ok: true})
});

module.exports = router;
