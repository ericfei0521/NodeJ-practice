const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
        this.userId = userId;
    }
    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then((products) => {
                return products;
            })
            .catch((err) => {
                throw err;
            });
    }
    static fetchProductById(id) {
        const db = getDb();
        return db
            .collection('products')
            .findOne({ _id: new mongodb.ObjectId(id) })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                throw err;
            });
    }
    static deleteById(id) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(id) })
            .catch((err) => {
                throw err;
            });
    }
    save() {
        const db = getDb();
        if (this._id) {
            return db.collection('products').updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                {
                    $set: {
                        title: this.title,
                        price: this.price,
                        description: this.description,
                        imageUrl: this.imageUrl,
                    },
                }
            );
        } else {
            return db
                .collection('products')
                .insertOne(this)
                .then((result) => {
                    console.log('result', result);
                })
                .catch((err) => {
                    throw err;
                });
        }
    }
}

module.exports = Product;
