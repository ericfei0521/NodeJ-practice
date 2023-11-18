const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title = '', imageUrl = '', description = '', price = '' } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const productUuid = req.params.productId;
    console.log(productUuid);
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: 'admin/edit-product',
        editing: true,
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>
        res.render('admin/products', {
            prods: products,
            pageTitle: 'my products',
            path: '/admin/products',
            hasProducts: products.length > 0,
        })
    );
};
