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
    let grays = [];

    Promise.map(colorArrs, function(colorArr) {
        colorArr.forEach((color, index) => {
            if (color.r === color.g && color.g === color.b)
                grays.push(index);
        });
    });

    console.log('Grayscales: %s', grays);
}).catch(err => {
    console.log(err);
});
