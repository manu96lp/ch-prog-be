import { Router } from 'express';
import { createProductRequestStruct, updateProductRequestStruct } from '../constants/structs.js';
import { productManager } from '../utils/managers.js';
import { verifyRequestParams } from '../utils/verifiers.js';
import { updateClientsProductsList } from '../utils/sockets.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query?.limit) || 0;
        const productList = await productManager.getProducts();

        if (limit) {
            res.status(200).json(productList.slice(0, limit));
        } else {
            res.status(200).json(productList);
        }
    } catch {
        res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productData = await productManager.getProductById(productId);

        res.status(200).json(productData);
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        verifyRequestParams(req.body, createProductRequestStruct);

        const bodyFields = { ...req.body };

        bodyFields.status = req.body.status ?? true;
        bodyFields.thumbnails = req.body.thumbnails || [];
        
        const result = await productManager.addProduct(bodyFields);
        
        updateClientsProductsList();

        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        verifyRequestParams(req.body, updateProductRequestStruct);

        const productId = parseInt(req.params.id);
        
        await productManager.updateProduct(productId, req.body);
        await updateClientsProductsList();

        res.sendStatus(204);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        
        await productManager.deleteProduct(productId);
        await updateClientsProductsList();

        res.sendStatus(204);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

export default router;
