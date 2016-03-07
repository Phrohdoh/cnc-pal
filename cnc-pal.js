'use strict';

let Promise = require('bluebird'),
    parser = require('binary-buffer-parser'),
    fs = Promise.promisifyAll(require('fs'));

exports.parsePalAsync = function(filename, palSize, remapShadowIndexArr) {
    let colors = Array(palSize);
    return fs.readFileAsync(filename).then(buff => {
        let readBuff = new parser(buff);
        for (let i = 0; i < palSize; i++) {
            let r = readBuff.byte() << 2;
            let g = readBuff.byte() << 2;
            let b = readBuff.byte() << 2;
            colors[i] = ((255 << 24) |
                (r << 16) |
                (g <<  8) |
                (b <<  0)) >>> 0;
        }
    
        colors[0] = 0;
    
        if (remapShadowIndexArr !== undefined)
            for (let i of remapShadowIndexArr)
                colors[i] = 140 << 24;
    
        return colors;
    });
}
