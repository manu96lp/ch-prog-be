import multer from 'multer';
import { getDirectoryFromUrl } from './path.js';

const currDir = getDirectoryFromUrl(import.meta.url);
const publicStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, `${currDir}/public/upload`); 
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});

export const publicUploader = multer({ publicStorage });
