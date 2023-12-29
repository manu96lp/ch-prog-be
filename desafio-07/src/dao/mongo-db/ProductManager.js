import ProductModel from './models/ProductModel.js';

class ProductManager {
    getProducts = async () => {
        const allProducts = await ProductModel.find().lean();

        return allProducts;
    };

    getProductById = async (id) => {
        const productById = await ProductModel.findById(id);

        if (!productById) {
            throw new Error('Product not found');
        }
        
        return productById.lean();
    };

    addProduct = async (product) => {
        const productToAdd = {
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails,
        };

        const productByCode = await ProductModel.findOne({ code: productToAdd.code });

        if (productByCode !== null) {
            throw new Error('Duplicated product code');
        }

        const newProduct = await ProductModel.create(productToAdd);

        return newProduct;
    };

    updateProduct = async (id, fields) => {
        const productByCode = await ProductModel.findById(id);

        if (!productByCode) {
            throw new Error('Product not found');
        }

        delete fields._id;

        if (fields.code && productByCode.code !== fields.code) {
            const productByCode = await ProductModel.findOne({ code: fields.code });

            if (productByCode !== null) {
                throw new Error('Duplicated product code');
            }
        }

        for (const field in fields) {
            productByCode[field] = fields[field];
        }

        await productByCode.save();
    };

    deleteProduct = async (id) => {
        const deleteResults = await ProductModel.deleteOne({ _id: id });
        
        if (!deleteResults?.deletedCount) {
            throw new Error('Product not found');
        }
    };
}

export default ProductManager;
