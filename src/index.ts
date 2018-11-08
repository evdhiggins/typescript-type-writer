import deploy from './deploy';
import generate from './generate';
import { handleError } from './util';
require('colors');

const cmd = String(process.argv[2]).toLowerCase();

try {
  if (cmd === 'deploy') {
    deploy();
  } else if (cmd === 'gen' || cmd === 'generate') {
    generate();
  } else {
    throw new Error(
      `Unknown command: ${cmd.italic}.

Available commands:
ttw deploy               Copy all type declaration files in types/* to node_modules/@types/*
ttw gen <module-name>    Add declaration directory & files to types/module-name
      `,
    );
  }
} catch (err) {
  handleError(err);
}
