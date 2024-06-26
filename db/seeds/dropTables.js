const db = require('../connection');

exports.dropTables = async () => {
    await db.query(`DROP TABLE IF EXISTS note_tags;`);
        await db.query(`DROP TABLE IF EXISTS notes;`);
        await db.query(`DROP TABLE IF EXISTS tags;`);
        await db.query(`DROP TABLE IF EXISTS topics;`);
        await db.query(`DROP TABLE IF EXISTS categories;`);
}