import path from 'path';
import ProductManager from '../lib/ProductManager.js';
import CartManager from '../lib/CartManager.js';

const pathToProductsFile = path.resolve('src', 'data', 'productos.json');
const productManager = new ProductManager(pathToProductsFile);

const pathToCartsFile = path.resolve('src', 'data', 'carrito.json');
const cartManager = new CartManager(pathToCartsFile);

export {
    productManager,
    cartManager,
};
