import 'dotenv/config';

const configObject = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoose: {
        host: process.env.MONGO_HOST,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        db: process.env.MONGO_DB,
        debug: process.env.MONGO_DEBUG,
    },
};

export default configObject;
