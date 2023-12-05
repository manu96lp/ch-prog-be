import SocketManager from '../lib/SocketManager.js';
import { productManager } from './managers.js';

export const updateClientsProductsList = async () => {
    const productsList = await productManager.getProducts();
    const listToRender = productsList.map((x) => ({ ...x, image: x.thumbnails[0] || null }));

    SocketManager.instance.emitProducts(listToRender);
};
