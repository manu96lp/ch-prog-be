import fs from 'fs';

class ProductManager {
    constructor(pathToFile) {
        this.count = 0;
        this.products = [];
        this.path = pathToFile;
    }

    getProducts = async () => {
        await this.loadFromFile();

        return this.products;
    };

    getProductById = async (id) => {
        await this.loadFromFile();

        if (id >= 0 && id < this.count) {
            const product = this.products.find((x) => x.id === id);

            if (product) {
                return product;
            }
        }
        
        throw new Error('Product ID not found');
    };

    addProduct = async (product) => {
        await this.loadFromFile();

        const productToAdd = {
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails,
        }

        if (Object.keys(productToAdd).some((x) => !productToAdd[x])) {
            throw new Error('Missing required fields');
        }
        
        if (this.products.some((x) => x.code === productToAdd.code)) {
            throw new Error('Duplicated product code');
        }

        productToAdd.id = this.count;

        this.count++;
        this.products.push(productToAdd);

        await this.saveToFile();

        return productToAdd;
    };

    updateProduct = async (id, fields) => {
        await this.loadFromFile();

        const productPos = this.products.findIndex((x) => x.id === id);

        if (productPos === -1) {
            throw new Error('Product ID not found');
        }

        delete fields.id;

        const currentProduct = this.products[productPos];
        const updatedProduct = { ...currentProduct, ...fields };

        if (currentProduct.code !== updatedProduct.code) {
            if (this.products.some((x) => x.code === updatedProduct.code)) {
                throw new Error('Duplicated product code');
            }
        }

        this.products[productPos] = updatedProduct;

        await this.saveToFile();
    };

    deleteProduct = async (id) => {
        await this.loadFromFile();
        
        const updatedList = this.products.filter((x) => x.id !== id);

        if (updatedList.length === this.products.length) {
            throw new Error('Product ID not found');
        }

        this.products = updatedList;

        await this.saveToFile();
    };

    loadFromFile = async () => {
        try {
            await fs.promises.access(this.path, fs.constants.F_OK | fs.constants.R_OK);

            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            const parsedContent = JSON.parse(fileContent);
            
            this.count = parsedContent.count || 0;
            this.products = parsedContent.products || [];
        } catch {
            console.error('Could not load from ' + this.path);
        }
    };

    saveToFile = async () => {
        try {
            const dataObject = { count: this.count, products: this.products };
            const dataAsJson = JSON.stringify(dataObject);

            await fs.promises.writeFile(this.path, dataAsJson);
        } catch {
            console.error('Could not save to ' + this.path);
        }
    };
}

export default ProductManager;
