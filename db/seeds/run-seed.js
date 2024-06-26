const testData = require('../data/test-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = async () => {
  await seed(testData);
    return await db.end();
};

runSeed();
