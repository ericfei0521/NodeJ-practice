const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            console.log('products', products);
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
    Product.fetchAll()
        .then((products) =>
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'my products',
                path: '/',
                hasProducts: products.length > 0,
            })
        )
        .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((cart) => {
            if (cart) {
                cart.getProducts()
                    .then((products) => {
                        return res.render('shop/cart', {
                            pageTitle: 'cart',
                            cart: products,
                            path: '/cart',
                        });
                    })
                    .catch((err) => console.log(err));
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
    let fetchedCart;
    let productQty = 1;
    let cartItemId = crypto.randomUUID();
    req.user
        .getCart()
        .then((cart) => {
            if (!cart) {
                req.user.createCart({ id: crypto.randomUUID() });
            }
            return cart;
        })
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                productQty = product.cartItem.quantity + 1;
                cartItemId = product.cartItem.id;
                return product;
            } else {
                return Product.findByPk(productId);
            }
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: { id: cartItemId, quantity: productQty },
            });
        })
        .then(() => res.redirect('/cart'))
        .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'checkout',
        path: '/checkout',
    });
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ['products'] })
        .then((orders) => {
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
    let productQty;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then((products) => {
            const product = products[0];
            productQty = product.cartItem.quantity;
            if (product.cartItem.quantity > 1) {
                productQty -= 1;
                return product.cartItem.update({ quantity: productQty });
            } else {
                return product.cartItem.destroy();
            }
        })
        .then(() => res.redirect('/cart'))
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchCart;
    req.user
        .getCart()
        .then((cart) => {
            fetchCart = cart;
            return cart.getProducts();
        })
        .then((products) => {
            return req.user
                .createOrder()
                .then((order) => {
                    return order.addProducts(
                        products.map((product) => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        })
                    );
                })
                .then((result) => {
                    if (result) {
                        fetchCart.setProducts(null);
                    }
                    res.redirect('/orders');
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};
