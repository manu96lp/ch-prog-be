import { createMessageRequestStruct } from '../constants/structs.js';
import { messageManager } from '../utils/managers.js';
import { verifyRequestParams } from '../utils/verifiers.js';

class SocketSingleton {
    static #instance = null;
    #server = null;

    emitProducts = (products) => {
        if (!this.#server) {
            throw new Error('Socket IO not initialized');
        }

        this.#server.emit('allProducts', products);
    }

    emitMessage = (message) => {
        if (!this.#server) {
            throw new Error('Socket IO not initialized');
        }

        this.#server.emit('newMessage', message);
    }

    createMessage = async (data) => {
        try {
            verifyRequestParams(data, createMessageRequestStruct);

            const messageBody = { ...data };
            const result = await messageManager.createMessage(messageBody);

            this.emitMessage(result);
        } catch {}
    }

    userConnected = (socket) => {
        socket.on('userMessage', this.createMessage);
    }

    initialize = (server) => {
        if (!!this.#server) {
            throw new Error('Socket IO already initialized');
        }
        
        this.#server = server;

        server.on('connection', this.userConnected);
    }

    static get instance() {
        if (!this.#instance) {
            this.#instance = new this();
        }

        return this.#instance;
    }
}

export default SocketSingleton;
