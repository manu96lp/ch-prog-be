import { Router } from 'express'
import { messageManager, productManager } from '../utils/managers.js';

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

router.get('/chat', async (_req, res) => {
    const messagesList = await messageManager.getMessages();
    
    res.render('chat', { messages: messagesList });
});

export default router;
