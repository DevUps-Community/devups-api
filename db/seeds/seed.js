const format = require("pg-format");
const db = require('../connection');

const seed = async ({}) => {
    await db
        .query(`DROP TABLE IF EXISTS notes;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
    await db.query(`CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
        );`);
    await db.query(`INSERT INTO users (username, password) VALUES
                ('${process.env.TEST_USERNAME}', '${process.env.TEST_PASSWORD}')
            `);
    try {
        await db.query(`CREATE TABLE notes (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            user_id INTEGER REFERENCES users(id)
        );`);
        await db.query(`INSERT INTO notes (title, content, user_id) VALUES
                ('${process.env.TEST_TITLE}', '${process.env.TEST_CONTENT}', 1)
            `);
        const result = await db.query(`SELECT * FROM notes;`);
        console.log(result.rows);
        return await db.end();
    } catch (err) {
        console.log(err);
        return await db.end();
    }
};

module.exports = seed;