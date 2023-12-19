import ProductManager from '../dao/mongo-db/ProductManager.js';
import CartManager from '../dao/mongo-db/CartManager.js';
import MessageManager from '../dao/mongo-db/MessageManager.js';

const productManager = new ProductManager();
const cartManager = new CartManager();
const messageManager = new MessageManager();

export {
    productManager,
    cartManager,
    messageManager,
};
