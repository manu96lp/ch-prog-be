import path from 'path';
import express from 'express';
import ProductManager from './lib/ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pathToDataFile = path.resolve('src', 'data', 'products.json');
const productManager = new ProductManager(pathToDataFile);

app.get('/api/products', async (req, res) => {
    try {
        const limit = parseInt(req.query?.limit) || 0;
        const productList = await productManager.getProducts();

        if (limit) {
            res.json(productList.slice(0, limit));
        } else {
            res.json(productList);
        }
    } catch {
        res.status(500).json({ status: "error", message: 'Something went wrong' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productData = await productManager.getProductById(productId);

        res.json(productData);
    } catch (ex) {
        res.status(404).json({ status: "error", message: 'Product not found' });
    }
});

app.listen(8080);
