import { statSync, existsSync, readdirSync, readFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { TypeFile } from './types';
import 'colors';

/**
 * Evaluates whether or not a directory exists for a given filepath
 * @param dirPath The path up to the evaluated directory. This should be stable.
 * @param dirName The name of the directory in question
 */
export const dirExists = (dirPath: string, dirName: string = ''): boolean => {
  try {
    if (statSync(resolve(dirPath, dirName)).isDirectory()) {
      return true;
    }
  } catch (_) {}

  return false;
};

/**
 * Gets the module name and type declarations file content for the specified module
 * @param dirPath The filepath to the module type directory, e.g. .../@types
 * @param dirName The name of the specific module directory within the types directory, e.g. `moduleName`
 */
export const getTypeDeclarationsFileContent = (dirPath: string, dirName: string): TypeFile => {
  if (!dirExists(dirPath, dirName)) {
    throw new Error(`${dirName} does not exist at ${dirPath}`);
  }

  // get all files in directory that end in .d.ts
  const dirFiles: string[] = readdirSync(resolve(dirPath, dirName)).filter((name: string) => /^.*\.d\.ts$/.test(name));

  if (dirFiles.length === 0) {
    throw new Error(`${dirName} doesn't contain .d.ts file`);
  }

  if (dirFiles.length > 1 && dirFiles.indexOf('index.d.ts') < 0) {
    throw new Error(
      `${dirName} contains multiple .d.ts files, none of which are 'index.d.ts'. Please rename the primary type declarations file to index.d.ts`,
    );
  }

  const fileName: string = dirFiles.length === 1 ? dirFiles[0] : dirFiles[dirFiles.indexOf('index.d.ts')];
  const content: string = readFileSync(resolve(dirPath, dirName, fileName), 'utf8');
  return { name: dirName, content };
};

/**
 * Checks if a directory exists, and if not creates it
 * @param dirPath The path to the directory that will be created
 */
export const mkDirIfNotExist = (dirPath: string | string[]): void => {
  const directories = Array.isArray(dirPath) ? dirPath : [dirPath];
  directories.forEach(dir => {
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
  });
};

/**
 * Logs the error message to the console and calls `process.exit()`
 * @param error A javascript error object
 */
export const handleError = (error: Error): void => {
  console.error('The script encountered an error:'.bgYellow.black);
  console.error(error.message.bgRed);
  console.error('Exiting...');
  process.exit();
};
