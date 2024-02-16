const mongodb = require('mongodb');
const { getDb } = require('../util/database');
class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    save() {
        const db = getDb();
        return db
            .collection('users')
            .insertOne(this)
            .catch((err) => {
                console.log(err);
            });
    }
    addToCart(product) {
        const db = getDb();
        const cartProductIndex = this.cart.findIndex((cp) => {
            return String(cp.productId) === String(product._id);
        });
        const updateCartItems = [...this.cart];
        if (cartProductIndex >= 0) {
            updateCartItems[cartProductIndex].quantity = updateCartItems[cartProductIndex].quantity + 1;
        } else {
            updateCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 });
        }
        return db.collection('users').updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            {
                $set: {
                    cart: updateCartItems,
                },
            }
        );
    }
    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new mongodb.ObjectId(userId) })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
module.exports = User;
