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
        throw new Error(`Unknown command: ${cmd.italic}.

Available commands:
ttw deploy               Copy all type declaration files in types/* to node_modules/@types/*
ttw gen <module-name>    Add declaration directory & files to types/module-name
      `);
    }
}
catch (err) {
    util_1.handleError(err);
}
