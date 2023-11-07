const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const productsPath = path.join(rootDir, 'data', 'products.json');

const getProdctsFromFile = (cb) => {
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
        getProdctsFromFile((products) => {
            console.log('this', this);
            products.push(this);
            fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    static fetchAll(cb) {
        getProdctsFromFile(cb);
    }
};
