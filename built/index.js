"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_1 = require("./deploy");
const generate_1 = require("./generate");
const util_1 = require("./util");
require('colors');
const cmd = String(process.argv[2]).toLowerCase();
try {
    if (cmd === 'deploy') {
        deploy_1.default();
    }
    else if (cmd === 'gen' || cmd === 'generate') {
        generate_1.default();
    }
    else {
        throw new Error(`Unknown command: ${cmd.italic}`);
    }
}
catch (err) {
    util_1.handleError(err);
}
