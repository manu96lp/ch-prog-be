const fs = require('fs');

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

        if (id > 0 && id <= this.count) {
            const product = this.products.find((x) => x.id === id);

            if (product) {
                return product;
            }
        }
        
        throw new Error('Product ID not found');
    };

    addProduct = async (product) => {
        const productToAdd = {
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

        productToAdd.id = 1 + this.count;

        this.count++;
        this.products.push(productToAdd);

        await this.saveToFile();

        return productToAdd.id;
    };

    updateProduct = async (id, fields) => {
        const productPos = this.products.findIndex((x) => x.id === id);

        if (productPos === -1) {
            throw new Error('Product ID not found');
        }

        delete fields.id;

        this.products[productPos] = { ...this.products[productPos], ...fields };

        await this.saveToFile();
    };

    deleteProduct = async (id) => {
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

async function test() {
    const pm = new ProductManager('data.txt');
    const newProduct = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'adc123',
        stock: 25,
    };

    await pm.addProduct(newProduct);

    const firstProduct = await pm.getProductById(1);

    console.log(await pm.getProducts());
    console.log(firstProduct);

    await pm.updateProduct(firstProduct.id, { ...firstProduct, stock: 30 });

    console.log(await pm.getProducts());

    await pm.deleteProduct(firstProduct.id);

    console.log(await pm.getProducts());
}

test();
