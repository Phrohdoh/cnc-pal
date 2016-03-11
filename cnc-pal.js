'use strict';

let Promise = require('bluebird'),
    parser = require('@phrohdoh/binary-buffer-parser'),
    fs = Promise.promisifyAll(require('fs'));

exports.parsePalAsync = function(filename, palSize) {
    let colors = Array(palSize);

    return fs.readFileAsync(filename).then(buff => {
        let readBuff = new parser(buff);

        for (let i = 0; i < palSize; i++)
            colors[i] = {
                r: readBuff.byte() << 2,
                g: readBuff.byte() << 2,
                b: readBuff.byte() << 2
            };

        colors[0] = {
            r: 0,
            b: 0,
            g: 0
        };

        return colors;
    });
}
