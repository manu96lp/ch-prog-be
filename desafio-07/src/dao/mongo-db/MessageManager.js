import MessageModel from './models/MessageModel.js';

class MessageManager {
    getMessages = async () => {
        const messages = await MessageModel.find().lean();

        return messages;
    };

    createMessage = async (payload) => {
        const newMessage = await MessageModel.create({
            user: payload.user,
            message: payload.message,
        });

        return newMessage.toObject();
    };
}

export default MessageManager;
