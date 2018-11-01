"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs = require("shelljs");
const util_1 = require("./util");
const path_1 = require("path");
/**
 * Creates a typescript module type declaration directory using DefinitelyTyped's template
 */
exports.default = () => {
    const rootPath = process.cwd();
    const moduleName = process.argv[3];
    if (typeof moduleName !== 'string' || moduleName.replace(/\s/g, '') === '') {
        throw new Error('No module name found.');
    }
    if (moduleName.replace(/[.\\/]/g, '') === '') {
        throw new Error(`Invalid module name (${moduleName.italic}`);
    }
    util_1.mkDirIfNotExist(path_1.resolve(rootPath, 'types'));
    if (util_1.dirExists(path_1.resolve(rootPath, 'types'), moduleName)) {
        throw new Error(`A directory already exists for ${moduleName.italic} (@ ${path_1.resolve(rootPath, 'types', moduleName).italic}). Please delete the existing directory before generating module declaration files.`);
    }
    // Create the typescript module type declaration file in DefinatelyTyped style
    shelljs.cd(rootPath);
    shelljs.exec(`npx dts-gen --dt --name ${moduleName} --template module`);
};
