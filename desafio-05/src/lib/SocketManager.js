class SocketManager {
    static #instance = null;
    #server = null;

    initialize(server) {
        if (!!this.#server) {
            throw new Error('Socket Manager already initialized');
        }
        
        this.#server = server;
    }

    emitProducts(products) {
        if (!this.#server) {
            throw new Error('Socket Manager not initialized');
        }

        this.#server.emit('products', products);
    }

    static get instance() {
        if (!this.#instance) {
            this.#instance = new this();
        }

        return this.#instance;
    }
}

export default SocketManager;
