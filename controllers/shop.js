const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then((data) =>
            res.render('shop/product-list', {
                prods: data[0],
                pageTitle: 'All products',
                path: '/products',
                activeShop: true,
                productCSS: true,
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

exports.getProductDetail = (req, res, next) => {
    const productUuid = req.params.productUuid;
    Product.findById(productUuid)
        .then(([products]) =>
            res.render('shop/product-details', {
                pageTitle: products[0]?.title,
                path: '/products/' + productUuid,
                product: products[0],
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then((data) =>
            res.render('shop/index', {
                prods: data[0],
                pageTitle: 'All products',
                path: '/',
                activeShop: true,
                productCSS: true,
            })
        )
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        res.render('shop/cart', {
            pageTitle: 'cart',
            cart: cart,
            path: '/cart',
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product);
    });
    res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'checkout',
        path: '/checkout',
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'orders',
        path: '/orders',
    });
};
exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    Cart.deleteCartItem(productId);
    res.redirect('/cart');
};
