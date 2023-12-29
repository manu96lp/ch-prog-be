import { Router } from 'express';
import { createMessageRequestStruct } from '../constants/structs.js';
import { messageManager } from '../utils/managers.js';
import { verifyRequestParams } from '../utils/verifiers.js';
import { sendMessageToClients } from '../utils/sockets.js';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const allMessages = await messageManager.getMessages();

        res.status(200).json(allMessages);
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        verifyRequestParams(req.body, createMessageRequestStruct);
        
        const messageBody = { ...req.body };
        const result = await messageManager.createMessage(messageBody);
        
        sendMessageToClients(messageBody);

        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message });
    }
});

export default router;
