const mongodb = require('mongodb');
const env = require('dotenv').config();
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        `mongodb+srv://techpit001:${env.parsed.MONGO_PWD}@cluster0.4oejlpu.mongodb.net/?retryWrites=true&w=majority`
    )
        .then((client) => {
            _db = client.db();
            console.log('successfully connected');
            callback();
        })
        .catch((err) => {
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'db not found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
