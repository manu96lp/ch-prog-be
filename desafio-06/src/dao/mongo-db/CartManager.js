import CartModel from './models/CartModel.js';

class CartManager {
    getCarts = async () => {
        const allCarts = await CartModel.find().lean();

        return allCarts;
    };

    getCartById = async (id) => {
        const cartById = await CartModel.findById(id);

        if (!cartById) {
            throw new Error('Cart not found');
        }
        
        return cartById.lean();
    };

    createCart = async (products) => {
        const newCart = await CartModel.create({
            products: [...products],
        });

        return newCart;
    };

    updateCart = async (id, products) => {
        const cartById = await CartModel.findById(id);

        if (!cartById) {
            throw new Error('Cart not found');
        }

        cartById.products = [...products];

        await cartById.save();
    };

    deleteCart = async (id) => {
        const deleteResults = await CartModel.deleteOne({ _id: id });
        
        if (!deleteResults?.deletedCount) {
            throw new Error('Cart not found');
        }
    };
}

export default CartManager;
