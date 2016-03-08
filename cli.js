#!/usr/bin/env node

'use strict';

let Promise = require('bluebird'),
    pal = require('./cnc-pal');

let args = process.argv.slice(2, -1),
    indexToView = process.argv[process.argv.length - 1];

if (indexToView > 254) {
    console.log("Corrected desired index to 254");
    indexToView = 254;
}
else if (indexToView < 0) {
    console.log("Corrected desired index to 0");
    indexToView = 0;
}
else if (isNaN(indexToView)) {
    console.log("No index given");
    process.exit(1);
}

for (let filename of args) {
    pal.parsePalAsync(filename, 255).then(colorArr => {
        if (colorArr.length !== 255)
            console.log(filename + ' is not 255 entries long.');

        let selectedColor = colorArr[indexToView] & 0xffffff,
            r = selectedColor & 0xff0000 >> 16,
            g = selectedColor & 0x00ff00 >>  8,
            b = selectedColor & 0x0000ff;

        console.log('Entry %s: %s\n[r: %s, g: %s, b: %s]', indexToView, selectedColor, r, g, b);
    }).catch(err => {
        console.log('ERR: ' + err);
    });
}
