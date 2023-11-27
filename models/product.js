const crypto = require('crypto');
// const Cart = require('./cart');
const db = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
    save() {
        const id = crypto.randomUUID();
        const insertData = [id, this.title, this.price, this.imageUrl, this.description];
        console.log(insertData);
        return db.execute(
            'INSERT INTO products (id, title, price, imageUrl, description) VALUES (?,?,?,?,?)',
            insertData
        );
    }

    static deleteProductById(id) {}

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }
    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
};
