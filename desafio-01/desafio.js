class ProductManager {
    constructor() {
        this.products = [];
        this.count = 0;
    }

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
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        if (id >= 0 && id < count) {
            const product = this.products.find((x) => x.id === id);

            if (product) {
                return product;
            }
        }
        
        throw new Error('Product ID not found');
    }
}
