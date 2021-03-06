#!/usr/bin/env node
let co = require('co');
let prompt = require('co-prompt');
let commander = require('commander');
let chalk = require('chalk');
let version = require('./package.json').version;
commander.version(version).parse(process.argv);
co(function* () {
    let name = yield prompt('Name for the snippet: ');
    let prefix = yield prompt('prefix for the snippet: ');
    let bodyPath = yield prompt('path for the file containing body:\n');
    let description = yield prompt('description for the snippet: ');
    let path = yield prompt("path for the language's json file:\n");
    let fs = require('fs');
    let json = require(path, 'utf-8');
    if (fs.existsSync(bodyPath)) {
        let body = fs.readFileSync(bodyPath, 'utf-8');
        body = body.split('\n');
        if (json[name]) {
            json[name].prefix = prefix;
            json[name].body = body;
            json[name].description = description;
        }
        else {
            json[name] = {};
            json[name].prefix = prefix
            json[name].body = body;
            json[name].description = description;
        }
        let file = JSON.stringify(json, null, "\t");
        fs.writeFile(path, file, (err) => {
            if (!err) {
                console.log(chalk.greenBright("Success!"));
                process.exit(0);
            }
            else {
                console.log(chalk.redBright('Error Writing file!'));
                process.exit(2);
            }
        });
    }
    else {
        console.log(chalk.redBright("Invalid Input!"));
        process.exit(1);
    }
});