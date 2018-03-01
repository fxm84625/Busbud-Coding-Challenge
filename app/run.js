var TSV = require('node-tsv-json');
const tsvFileName = 'cities_canada-usa.tsv';

let tsvDataArr = [];
TSV({
    input: tsvFileName,
    output: 'output.json',
    parseRows: true
}, function( error, result ) {
    if( error ) {
        console.log( "Error reading Tsv file\n" + error );
        return;
    }
    tsvDataArr = result;
});