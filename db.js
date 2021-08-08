const {MongoClient} = require("mongodb");
const Mongoose = require("mongoose");

// Connection URI
const uri = "mongodb://localhost:27017/test";
// Create a new MongoClient
const client = new MongoClient(uri);

function close() {
    return client.close();
}

async function connect() {
    await client.connect()
    await Mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    console.log("Connected successfully to server");
}

function getUsersCollection() {
    return client.db("test").collection("users");
}

module.exports = {connect, close, getUsersCollection};
