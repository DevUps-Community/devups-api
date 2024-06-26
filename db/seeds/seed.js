//const format = require('pg-format');
const db = require('../connection');
const { createTables } = require('./createTables');
const { dropTables } = require('./dropTables');

const seed = async () => {
    //   await db.query(`DROP TABLE IF EXISTS suggestions;`);
    //   await db.query(`DROP TABLE IF EXISTS favourites;`);
    try {
        await dropTables();
        await createTables();
        //TODO - INSERT SEED DATA FOR THE NOTES 
    } catch (err) {
        console.log(err);
    }
};

module.exports = seed;
