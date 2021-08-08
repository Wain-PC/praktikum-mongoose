const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async function (req, res, next) {
    try {
        const users = await User.find({}).orFail(new Error("Users not found"));
        res.status(200).send({users})
    } catch (err) {
        res.status(500).send({error: err.name})
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id).orFail(new Error("User not found"));
        res.status(200).send({user})
    } catch (err) {
        res.status(500).send({error: err.name})
    }
});

router.post('/', async function (req, res, next) {
    try {
        const user = await User.create(req.body)
    } catch (err) {
        res.status(500).send({message: err.name})
    }


    return res.status(200).send({ok: true})
});

module.exports = router;
