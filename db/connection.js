const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
    throw new Error("Environment variable is not set.")
}

const config = {};

if (ENV === 'test') {
    config.connectionString = process.env.PGDATABASE;
    config.max = 5;    
}

module.exports = new Pool();
