#! /usr/bin/env node
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let bodyPath = process.argv[2];
let obj = process.argv[3];
let fs = require('fs');
let json = require('C://Users//pc//AppData//Roaming//Code//User//snippets//javascript.json', 'utf-8');
if (fs.existsSync(bodyPath)) {
    let body = fs.readFileSync(bodyPath, 'utf-8');
    body = body.split('\n');
    if (json[obj]) {
        json[obj].body = body;
    }
    else {
        json[obj] = {};
        json[obj].prefix = json[obj].description = obj;
        json[obj].body = body;
    }
    let file = JSON.stringify(json, null, "\t");
    fs.writeFile('C://Users//pc//AppData//Roaming//Code//User//snippets//javascript.json', file, (err) => {
        if (!err) {
            console.log("Success!");
        }
        else {
            console.log('Error Writing file!');
        }
    });
}
else {
    console.log("Invalid Input!");
}