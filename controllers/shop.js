const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'my products',
                path: '/products',
                hasProducts: products.length > 0,
            });
        })
        .catch((err) => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    const productUuid = req.params.productUuid;
    Product.fetchProductById(productUuid)
        .then((result) => {
            res.render('shop/product-details', {
                pageTitle: result?.title,
                path: '/products/' + productUuid,
                product: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then((products) => {
            console.log('products', products);
            return res.render('shop/product-list', {
                prods: products,
                pageTitle: 'my products',
                path: '/',
                hasProducts: products.length > 0,
            });
        })
        .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((products) => {
            if (products) {
                return res.render('shop/cart', {
                    pageTitle: 'cart',
                    cart: products,
                    path: '/cart',
                });
            } else {
                return res.render('shop/cart', {
                    pageTitle: 'cart',
                    cart: null,
                    path: '/cart',
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchProductById(productId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then(() => {
            res.redirect('/cart');
        });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'checkout',
        path: '/checkout',
    });
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then((orders) => {
            console.log('orders', orders.items);
            res.render('shop/orders', {
                pageTitle: 'orders',
                orders: orders,
                path: '/orders',
            });
        })
        .catch((err) => console.log(err));
};
exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .deleteCartItem(productId)
        .then(() => res.redirect('/cart'))
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then((result) => {
            console.log('result');
            res.redirect('/orders');
        })
        .catch((err) => console.log(err));
};
