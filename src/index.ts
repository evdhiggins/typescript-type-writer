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
    throw new Error(`Unknown command: ${cmd.italic}`);
  }
} catch (err) {
  handleError(err);
}
