import fs from 'fs';

class CartManager {
    constructor(pathToFile) {
        this.count = 0;
        this.carts = [];
        this.path = pathToFile;
    }

    getCarts = async () => {
        await this.loadFromFile();

        return this.carts;
    };

    getCartById = async (id) => {
        await this.loadFromFile();
        
        if (id > 0 && id <= this.count) {
            const cart = this.carts.find((x) => x.id === id);

            if (cart) {
                return cart;
            }
        }
        
        throw new Error('Cart ID not found');
    };

    createCart = async (products) => {
        await this.loadFromFile();

        const cart = {
            id: this.count + 1,
            products: [...products],
        };

        this.count++;
        this.carts.push(cart);

        await this.saveToFile();

        return cart;
    };

    updateCart = async (id, products) => {
        await this.loadFromFile();

        const cartPos = this.carts.findIndex((x) => x.id === id);

        if (cartPos === -1) {
            throw new Error('Cart ID not found');
        }

        this.carts[cartPos].products = [...products];

        await this.saveToFile();
    };

    deleteCart = async (id) => {
        await this.loadFromFile();
        
        const updatedList = this.carts.filter((x) => x.id !== id);

        if (updatedList.length === this.carts.length) {
            throw new Error('Cart ID not found');
        }

        this.carts = updatedList;

        await this.saveToFile();
    };

    loadFromFile = async () => {
        try {
            await fs.promises.access(this.path, fs.constants.F_OK | fs.constants.R_OK);

            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            const parsedContent = JSON.parse(fileContent);
            
            this.count = parsedContent.count || 0;
            this.carts = parsedContent.carts || [];
        } catch {
            console.error('Could not load from ' + this.path);
        }
    };

    saveToFile = async () => {
        try {
            const dataObject = { count: this.count, carts: this.carts };
            const dataAsJson = JSON.stringify(dataObject);

            await fs.promises.writeFile(this.path, dataAsJson);
        } catch {
            console.error('Could not save to ' + this.path);
        }
    };
}

export default CartManager;
