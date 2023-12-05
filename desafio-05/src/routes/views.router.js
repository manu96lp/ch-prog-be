import { Router } from 'express'
import { productManager } from '../utils/managers.js';

const router = Router();

router.get('/', async (_req, res) => {
    const productList = await productManager.getProducts();
    const listToRender = productList.map((x) => ({ ...x, image: x.thumbnails[0] || null }));
    
    res.render('home', { products: listToRender });
});

router.get('/realtimeproducts', async (_req, res) => {
    const productList = await productManager.getProducts();
    const listToRender = productList.map((x) => ({ ...x, image: x.thumbnails[0] || null }));
    
    res.render('realTimeProducts', { products: listToRender });
});

export default router;
