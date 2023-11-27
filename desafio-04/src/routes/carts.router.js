import { Router } from 'express';
import { verifyRequestParams } from '../utils/verifiers.js';
import { createCartRequestStruct, updateCartRequestStruct } from '../constants/structs.js';
import { cartManager, productManager } from '../utils/managers.js';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const cartId = parseInt(req.params.id);
        const cartData = await cartManager.getCartById(cartId);

        res.status(200).json(cartData.products);
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        verifyRequestParams(req.body, createCartRequestStruct);
        
        const productsToSet = [];
        
        if (req?.body?.products) {
            req.body.products.forEach((x) => {
                productManager.getProductById(x.product);
                productsToSet.push({
                    product: x.product,
                    quantity: Math.max(1, x.quantity || 1),
                });
            });
        }

        const result = await cartManager.createCart(productsToSet);

        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        verifyRequestParams(req.body, updateCartRequestStruct);

        const cartId = parseInt(req.params.cid);
        const cartById = await cartManager.getCartById(cartId);
        const cartProducts = [...cartById.products];

        const productId = parseInt(req.params.pid);
        const productQuantity = parseInt(req.body?.quantity) || 1;
        const productInCart = cartProducts.find((x) => x.product === productId);

        if (!productInCart) {
            productManager.getProductById(productId);
            cartProducts.push({
                product: productId,
                quantity: productQuantity,
            });
        } else {
            productInCart.quantity = Math.max(1, productInCart.quantity + productQuantity);
        }

        await cartManager.updateCart(cartId, cartProducts);

        res.sendStatus(200);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);

        await cartManager.deleteCart(cartId);

        res.sendStatus(204);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const cartById = await cartManager.getCartById(cartId);
        const updatedCartProducts = cartById.products.filter((x) => x.product !== productId);

        await cartManager.updateCart(cartId, updatedCartProducts);

        res.sendStatus(204);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

export default router;
