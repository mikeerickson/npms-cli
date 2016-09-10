'use strict';

const util = require('util');
const got = require('got');
const handleError = require('./util/handleError');

exports.command = 'info <package>';
exports.describe = 'Get info from npms.io of a given package.';
exports.builder = (yargs) =>
    yargs
    .strict()
    .options({
        output: {
            alias: 'o',
            describe: 'Format the results in a human readable format or as JSON.',
            default: 'human',
        },
        color: {
            describe: 'Allows disabling or enabling colored output',
            type: 'boolean',
            default: true,
        },
    });

exports.handler = (argv) => {
    got(`https://api.npms.io/module/${encodeURIComponent(argv.package)}`, { json: true })
    .then((res) => {
        if (argv.output === 'json') {
            console.log(JSON.stringify(res.body, null, 2));
        } else {
            console.log(util.inspect(res.body, { depth: null, colors: argv.color }));
        }
    })
    .then(() => { process.exitCode = 0; })
    .catch((err) => handleError(err));
};
