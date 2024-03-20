const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title = '', imageUrl = '', description = '', price = '' } = req.body;
    const product = new Product({ title: title, price: price, description: description, imageUrl: imageUrl });
    product
        .save()
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
    Product.fetchProductById(prodUuid)
        .then((product) => {
            return res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: 'admin/edit-product',
                editing: editMode,
                product: product,
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const { id, title = '', imageUrl = '', description = '', price = '' } = req.body;
    const product = new Product(title, price, description, imageUrl, id);
    return product
        .save()
        .then(() => res.redirect('/admin/products'))
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            console.log('products', products);
            return res.render('admin/products', {
                prods: products,
                pageTitle: 'my products',
                path: '/admin/products',
                hasProducts: products.length > 0,
            });
        })
        .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch((err) => console.log(err));
};
