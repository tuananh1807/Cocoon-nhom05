const Cart = require('../models/cartModel');
const express = require('express');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findById(userId);

        if (!cart) {
            cart = new Cart({ _id: userId, products: [] });
        }
        const existingProductIndex = cart.products.findIndex(
            (item) => item.productId.toHexString() === productId
        );
        if (existingProductIndex !== -1) {
            // If product already exists in cart, update quantity
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // If product does not exist, add new product to cart
            cart.products.push({ productId, quantity });
        }
        await cart.save();
        return res.status(200).json({ message: 'Added to cart successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error adding to cart' });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findById(userId).populate({
            path: 'products.productId',
            model: 'products',
        });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error fetching cart' });
    }
});

router.put('/update', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findById(userId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const existingProductIndex = cart.products.findIndex(
            (item) => item.productId.toHexString() === productId
        );
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity = quantity;
            await cart.save();
            return res.status(200).json({ message: 'Product quantity updated' });
        } else {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error updating product quantity' });
    }
});

router.delete('/delete', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findById(userId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        cart.products = cart.products.filter(
            (item) => item.productId.toHexString() !== productId
        );
        await cart.save();
        return res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        return res.status(500).json({ error: 'Error removing product from cart' });
    }
});

module.exports = router;
