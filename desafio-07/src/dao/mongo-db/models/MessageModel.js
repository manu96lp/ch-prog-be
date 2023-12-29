import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const messageModel = mongoose.model('messages', messageSchema);

export default messageModel;
