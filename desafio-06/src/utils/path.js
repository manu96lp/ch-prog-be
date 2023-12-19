import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getDirectoryFromUrl = (metaUrl) => {
    const currentFileName = fileURLToPath(metaUrl);
    const currentDirectory = dirname(currentFileName);

    return currentDirectory;
};
