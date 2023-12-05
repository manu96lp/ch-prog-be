import multer from 'multer';

const publicStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './src/public/'); 
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});

export const publicUploader = multer({ publicStorage });
