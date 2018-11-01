import shelljs = require('shelljs');
import { mkDirIfNotExist, dirExists } from './util';
import { resolve } from 'path';

/**
 * Creates a typescript module type declaration directory using DefinitelyTyped's template
 */
export default (): void => {
  const rootPath: string = process.cwd();
  const moduleName: string = process.argv[3];

  if (typeof moduleName !== 'string' || moduleName.replace(/\s/g, '') === '') {
    throw new Error('No module name found.');
  }

  if (moduleName.replace(/[.\\/]/g, '') === '') {
    throw new Error(`Invalid module name (${moduleName.italic})`);
  }

  mkDirIfNotExist(resolve(rootPath, 'types'));

  if (dirExists(resolve(rootPath, 'types'), moduleName)) {
    throw new Error(
      `A directory already exists for ${moduleName.italic} (@ ${
        resolve(rootPath, 'types', moduleName).italic
      }). Please delete the existing directory before generating module declaration files.`,
    );
  }
  // Create the typescript module type declaration file in DefinatelyTyped style
  shelljs.cd(rootPath);
  shelljs.exec(`npx dts-gen --dt --name ${moduleName} --template module`);
};
