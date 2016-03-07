#!/usr/bin/env node

'use strict';

let Promise = require('bluebird'),
    pal = require('./cnc-pal');

let args = process.argv.slice(2);

for (let filename of args) {
    pal.parsePalAsync(filename, 255).then(colorArr => {
        if (colorArr.length !== 255)
            console.log(filename + ' is not 255 entries long.');

        console.log(colorArr[colorArr.length - 1]);
    }).catch(err => {
        console.log('ERR: ' + err);
    });
}
