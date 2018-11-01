import { writeFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { TypeFile } from './types';
import { mkDirIfNotExist, getTypeDeclarationsFileContent, dirExists, handleError } from './util';

export default () => {
  const rootPath: string = resolve(process.cwd());

  if (!dirExists(rootPath, '@types')) {
    throw new Error(`An @types directory doesn't exist at the assumed project root (${rootPath})`);
  }

  // The path to all project-defined module type files
  const typeFilesPath: string = resolve(rootPath, '@types');

  // An array of all files within project types directory
  const typeDirectories: string[] = readdirSync(typeFilesPath, 'UTF8') as string[];

  const typeFiles: TypeFile[] = [];

  typeDirectories.forEach(name => {
    typeFiles.push(getTypeDeclarationsFileContent(typeFilesPath, name));
  });

  const nodeModulesPath: string = resolve(rootPath, 'node_modules');
  const nodeModulesTypesPath: string = resolve(nodeModulesPath, '@types');

  mkDirIfNotExist([nodeModulesPath, nodeModulesTypesPath]);

  typeFiles.forEach((typeFile: TypeFile) => {
    mkDirIfNotExist(resolve(nodeModulesTypesPath, typeFile.name));
    writeFileSync(resolve(nodeModulesTypesPath, typeFile.name, 'index.d.ts'), typeFile.content, 'UTF8');
  });
};
