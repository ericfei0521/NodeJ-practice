const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productUuid', shopController.getProductDetail);

// router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

// router.get('/checkout', shopController.getCheckout);

// router.get('/orders', shopController.getOrders);

// router.post('/cart-delete-item', shopController.deleteCartItem);

// router.post('/create-order', shopController.postOrder);

module.exports = router;
