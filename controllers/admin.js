const Product = require('../models/product');
const crypto = require('crypto');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title = '', imageUrl = '', description = '', price = '' } = req.body;
    req.user
        .createProduct({
            id: crypto.randomUUID(),
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: price,
        })
        .then(() => {
            console.log('SUCCESS CREATED');
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query?.edit;
    const prodUuid = req.params.productId;
    if (!editMode) {
        res.redirect('/');
    }
    req.user
        .getProducts({ where: { id: prodUuid } })
        .then((product) => {
            return res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: 'admin/edit-product',
                editing: editMode,
                product: product[0],
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const { id, title = '', imageUrl = '', description = '', price = '' } = req.body;
    Product.findByPk(id)
        .then((product) => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;
            return product.save();
        })
        .then(() => res.redirect('/admin/products'))
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then((products) =>
            res.render('admin/products', {
                prods: products,
                pageTitle: 'my products',
                path: '/admin/products',
                hasProducts: products.length > 0,
            })
        )
        .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk(productId)
        .then((product) => {
            if (product) {
                return product.destroy();
            } else {
                res.redirect('/admin/products');
            }
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch((err) => console.log(err));
};
