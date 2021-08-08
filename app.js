const express = require('express');
const db = require('./db');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const usersMongooseRouter = require('./routes/users_mongoose');

async function start() {
    await db.connect();
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use('/users', usersRouter);
    app.use('/users_mongoose', usersMongooseRouter);
    return app;
}


module.exports = start;
