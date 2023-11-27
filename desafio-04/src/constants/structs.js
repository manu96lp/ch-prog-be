export const createProductRequestStruct = {
    title: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    code: {
        type: 'string',
        required: true,
    },
    price: {
        type: 'number',
        required: true,
    },
    status: {
        type: 'boolean',
        required: false,
    },
    stock: {
        type: 'number',
        required: true,
    },
    category: {
        type: 'string',
        required: true,
    },
    thumbnails: {
        type: {
            name: 'array of strings',
            parser: (x) => {
                if (Array.isArray(x)) {
                    return x.every((y) => typeof y === 'string');
                }

                return false;
            },
        },
        required: false,
    },
};

export const updateProductRequestStruct = {
    title: {
        type: 'string',
        required: false,
    },
    description: {
        type: 'string',
        required: false,
    },
    code: {
        type: 'string',
        required: false,
    },
    price: {
        type: 'number',
        required: false,
    },
    status: {
        type: 'boolean',
        required: false,
    },
    stock: {
        type: 'number',
        required: false,
    },
    category: {
        type: 'string',
        required: false,
    },
    thumbnails: {
        type: {
            name: 'array of strings',
            parser: (x) => {
                if (Array.isArray(x)) {
                    return x.every((y) => typeof y === 'string');
                }

                return false;
            },
        },
        required: false,
    },
};

export const createCartRequestStruct = {
    products: {
        type: {
            name: 'array of products',
            parser: (x) => {
                if (Array.isArray(x)) {
                    return x.every((y) =>
                        y && typeof y.product === 'number' && (!y.quantity || typeof y.quantity === 'number')
                    );
                }

                return false;
            },
        },
        required: false,
    },
};

export const updateCartRequestStruct = {
    quantity: {
        type: 'number',
        required: false,
    },
};
