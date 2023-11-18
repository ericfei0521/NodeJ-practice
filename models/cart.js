const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const cartPath = path.join(rootDir, 'data', 'cart.json');
const productsPath = path.join(rootDir, 'data', 'products.json');

module.exports = class Cart {
    static addProduct(id, prodDetail = null) {
        let cart = { products: [], totalPrice: 0 };
        console.log(prodDetail);
        fs.readFile(cartPath, (error, fileContent) => {
            if (!error) {
                cart = JSON.parse(fileContent);
            }
            const existingProdIndex = cart.products.findIndex((prod) => prod.id === id);
            const existingProd = cart.products[existingProdIndex];
            let updateProd;
            if (existingProd) {
                updateProd = { ...existingProd, qty: existingProd.qty + 1 };
                cart.products[existingProdIndex] = updateProd;
            } else {
                updateProd = { ...prodDetail, qty: 1 };
                cart.products.push(updateProd);
            }
            if (prodDetail) {
                cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(prodDetail.price);
            }
            fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }
};
