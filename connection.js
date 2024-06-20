const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

const pathToCorrectEnvFile = `${dirname}/../.env.${ENV}`;

console.log(dirname); 
console.log(pathToCorrectEnvFile);

require('dotenv').config({
  path: pathToCorrectEnvFile,
});

module.exports = new Pool();