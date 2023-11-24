const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const cartPath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, prodDetail = null) {
        let cart = { products: [], totalPrice: 0 };
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
    static deleteProductById(id) {
        fs.readFile(cartPath, (error, fileContent) => {
            if (error) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            const productIndex = updatedCart.products.findIndex((prod) => prod.id === id);
            const product = cart.products[productIndex];
            if (!product) {
                return;
            }
            updatedCart.totalPrice = parseFloat(updatedCart.totalPrice) - parseFloat(product.price) * product.qty;
            updatedCart.products.splice(productIndex, 1);
            fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }
    static deleteCartItem(id) {
        fs.readFile(cartPath, (error, fileContent) => {
            if (error) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const productIndex = cart.products.findIndex((prod) => prod.id === id);

            if (productIndex !== -1) {
                const product = cart.products[productIndex];
                const updatedCart = { ...cart };

                if (product.qty > 1) {
                    updatedCart.products[productIndex] = { ...product, qty: product.qty - 1 };
                } else {
                    updatedCart.products.splice(productIndex, 1);
                }

                updatedCart.totalPrice = parseFloat(updatedCart.totalPrice) - parseFloat(product.price);

                fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }
    static getCart(cb) {
        fs.readFile(cartPath, (error, fileContent) => {
            if (!error) {
                cb(JSON.parse(fileContent));
            } else {
                cb(null);
            }
        });
    }
};
