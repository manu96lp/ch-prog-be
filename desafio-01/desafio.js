class ProductManager {
    constructor() {
        this.products = [];
        this.count = 0;
    }

    addProduct = (product) => {
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

        this.products.push(productToAdd);
        this.count++;
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        if (id > 0 && id <= this.count) {
            const product = this.products.find((x) => x.id === id);

            if (product) {
                return product;
            }
        }
        
        throw new Error('Product ID not found');
    }
}

const pm = new ProductManager();
const newProduct = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'adc123',
    stock: 25,
};

console.log(pm.getProducts());

pm.addProduct(newProduct);

console.log(pm.getProducts());

try {
    pm.addProduct(newProduct);
} catch (ex) {
    console.log(ex.message);
}

console.log(pm.getProductById(1));

try {
    pm.getProductById(0);
} catch (ex) {
    console.log(ex.message);
}