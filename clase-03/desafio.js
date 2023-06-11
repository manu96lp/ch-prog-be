const fs = require('fs');

class ProductManager {
    constructor(pathToFile) {
        this.products = [];
        this.count = 0;
        this.path = pathToFile;
    }

    getProducts = () => {
        return this.products;
    };

    getProductById = (id) => {
        if (id >= 0 && id < count) {
            const product = this.products.find((x) => x.id === id);

            if (product) {
                return product;
            }
        }
        
        throw new Error('Product ID not found');
    };

    addProduct = (product) => {
        const productToAdd = {
            id: this.count,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
        }

        if (Object.keys(productToAdd).some((x) => !productToAdd[x])) {
            throw new Error('Missing required fields');
        }
        
        if (this.products.some((x) => x.code === productToAdd.code)) {
            throw new Error('Duplicated product code');
        }

        this.products.push(productToAdd);
        this.count++;
    };

    updateProduct = (id, fields) => {
        const productPos = this.products.findIndex((x) => x.id === id);

        if (productPos === -1) {
            throw new Error('Product ID not found');
        }

        this.products[productPos] = { ...this.products[productPos], ...fields };
    };

    deleteProduct = (id) => {
        const updatedList = this.products.filter((x) => x.id !== id);

        if (updatedList.length === this.products.length) {
            throw new Error('Product ID not found');
        }

        this.products = updatedList;
    };

    saveToFile = async () => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    loadFromFile = async () => {
        if (!fs.existsSync(this.path)) {
        }

        const fileContent = await fs.promises.readFile(this.path, 'utf-8');
        const parsedContent = JSON.parse(fileContent);

        if (!Array.isArray(parsedContent)) {
            return;
        }
        
        this.products = parsedContent;
    };
}
