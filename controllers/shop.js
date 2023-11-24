const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        })
    );
};

exports.getProductDetail = (req, res, next) => {
    const productUuid = req.params.productUuid;
    Product.findById(productUuid, (product) => {
        res.render('shop/product-details', {
            pageTitle: product?.title,
            path: '/products/' + productUuid,
            product: product,
        });
    });
};

exports.getIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: 'Shop',
        path: '/',
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
