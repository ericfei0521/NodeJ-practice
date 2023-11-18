const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const crypto = require('crypto');

const productsPath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(productsPath, (error, fileContent) => {
        if (error) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
    save() {
        this.id = crypto.randomUUID();
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((product) => product.id === id) || null;
            cb(product);
        });
    }
};
