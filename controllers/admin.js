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
    Product.create({
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
    Product.findByPk(prodUuid)
        .then((product) =>
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: 'admin/edit-product',
                editing: editMode,
                product: product,
            })
        )
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const { id, title = '', imageUrl = '', description = '', price = '' } = req.body;
    const product = new Product(id, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
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
    Product.deleteProductById(productId);
    res.redirect('/admin/products');
};
