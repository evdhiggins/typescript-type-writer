"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("./util");
exports.default = () => {
    const rootPath = path_1.resolve(process.cwd());
    if (!util_1.dirExists(rootPath, 'types')) {
        throw new Error(`A 'types' directory doesn't exist at the assumed project root (${rootPath})`);
    }
    // The path to all project-defined module type files
    const typeFilesPath = path_1.resolve(rootPath, 'types');
    // An array of all files within project types directory
    const typeDirectories = fs_1.readdirSync(typeFilesPath, 'UTF8');
    const typeFiles = [];
    typeDirectories.forEach(name => {
        typeFiles.push(util_1.getTypeDeclarationsFileContent(typeFilesPath, name));
    });
    const nodeModulesPath = path_1.resolve(rootPath, 'node_modules');
    const nodeModulesTypesPath = path_1.resolve(nodeModulesPath, '@types');
    util_1.mkDirIfNotExist([nodeModulesPath, nodeModulesTypesPath]);
    typeFiles.forEach((typeFile) => {
        util_1.mkDirIfNotExist(path_1.resolve(nodeModulesTypesPath, typeFile.name));
        fs_1.writeFileSync(path_1.resolve(nodeModulesTypesPath, typeFile.name, 'index.d.ts'), typeFile.content, 'UTF8');
    });
};
