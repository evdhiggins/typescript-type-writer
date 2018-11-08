"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
require("colors");
/**
 * Evaluates whether or not a directory exists for a given filepath
 * @param dirPath The path up to the evaluated directory. This should be stable.
 * @param dirName The name of the directory in question
 */
exports.dirExists = (dirPath, dirName = '') => {
    try {
        if (fs_1.statSync(path_1.resolve(dirPath, dirName)).isDirectory()) {
            return true;
        }
    }
    catch (_) { }
    return false;
};
/**
 * Gets the module name and type declarations file content for the specified module
 * @param dirPath The filepath to the module type directory, e.g. .../@types
 * @param dirName The name of the specific module directory within the types directory, e.g. `moduleName`
 */
exports.getTypeDeclarationsFileContent = (dirPath, dirName) => {
    if (!exports.dirExists(dirPath, dirName)) {
        throw new Error(`${dirName} does not exist at ${dirPath}`);
    }
    // get all files in directory that end in .d.ts
    const dirFiles = fs_1.readdirSync(path_1.resolve(dirPath, dirName)).filter((name) => /^.*\.d\.ts$/.test(name));
    if (dirFiles.length === 0) {
        throw new Error(`${dirName} doesn't contain .d.ts file`);
    }
    if (dirFiles.length > 1 && dirFiles.indexOf('index.d.ts') < 0) {
        throw new Error(`${dirName} contains multiple .d.ts files, none of which are 'index.d.ts'. Please rename the primary type declarations file to index.d.ts`);
    }
    const fileName = dirFiles.length === 1 ? dirFiles[0] : dirFiles[dirFiles.indexOf('index.d.ts')];
    const content = fs_1.readFileSync(path_1.resolve(dirPath, dirName, fileName), 'utf8');
    return { name: dirName, content };
};
/**
 * Checks if a directory exists, and if not creates it
 * @param dirPath The path to the directory that will be created
 */
exports.mkDirIfNotExist = (dirPath) => {
    const directories = Array.isArray(dirPath) ? dirPath : [dirPath];
    directories.forEach(dir => {
        if (!fs_1.existsSync(dir)) {
            fs_1.mkdirSync(dir);
        }
    });
};
/**
 * Logs the error message to the console and calls `process.exit()`
 * @param error A javascript error object
 */
exports.handleError = (error) => {
    const errorTitle = 'Error:'.bgYellow.black;
    console.error(`${errorTitle} ${error.message}`);
    console.error('Exiting...');
    process.exit();
};
