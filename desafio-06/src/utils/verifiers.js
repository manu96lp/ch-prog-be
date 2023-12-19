export const verifyRequestParams = (params, struct) => {
    Object.keys(params).forEach((x) => {
        if (!struct[x]) {
            throw new Error(`Parameter (${x}) is not recognized`);
        }
    });

    Object.keys(struct).forEach((x) => {
        if (!params[x]) {
            if (struct[x].required) {
                throw new Error(`Parameter (${x}) is required`);
            }
        } else if (struct[x].type) {
            if (typeof struct[x].type === 'object') {
                if (!struct[x].type.parser(params[x])) {
                    throw new Error(`Parameter (${x}) must be of type (${struct[x].type.name})`);
                }
            } else {
                if (struct[x].type !== typeof params[x]) {
                    throw new Error(`Parameter (${x}) must be of type (${struct[x].type})`);
                }
            }
        }
    });
};
