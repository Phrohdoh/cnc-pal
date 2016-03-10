#!/usr/bin/env node

'use strict';

let args = require('yargs')
    .help('h').alias('h', 'help')
    .usage('Usage: $0 <file1.pal> [file2.pal [file3.pal [... ]]]')
    .epilogue('Copyright Taryn Hill <Phrohdoh@gmail.com> 2016')
    .argv,
    Promise = require('bluebird'),
    pal = require('./cnc-pal');

Promise.map(args._, function(filename) {
    return pal.parsePalAsync(filename, 255);
}).then(colorArrs => {
    return Promise.map(colorArrs, function(colorArr) {
        colorArr.forEach((color, index) => {
            let selectedColor = color & 0xffffff,
                r = selectedColor & 0xff000000 >> 24,
                g = selectedColor & 0x00ff0000 >> 16,
                b = selectedColor & 0x0000ff00 >> 8;

            if (r === g && g === b) {
                console.log('Grayscale: %s', index);
            }
        })
    });
}).catch(err => {
    console.log(err);
});
