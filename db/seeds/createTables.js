const db = require('../connection');

exports.createTables = async () => {
    await db.query(`CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        created_by VARCHAR(30),
        created_at TIMESTAMPTZ
    );`);
    await db.query(`CREATE TABLE topics (
        topic_id SERIAL PRIMARY KEY,
        category_id INT,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_by VARCHAR(30),
        created_at TIMESTAMPTZ,
        FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
    );`);
    await db.query(`CREATE TABLE tags (
        tag_id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE
    );`);
    await db.query(`CREATE TABLE notes (
        note_id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        content TEXT,
        category_id INT NOT NULL,
        topic_id INT NOT NULL,
        visible BOOL,
        created_by VARCHAR(30),
        created_at TIMESTAMPTZ,
        FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
    );`);
    await db.query(`CREATE TABLE note_tags (
        note_id INT NOT NULL,
        tag_id INT NOT NULL,
        PRIMARY KEY (note_id, tag_id),
        FOREIGN KEY (note_id) REFERENCES notes (note_id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags (tag_id) ON DELETE CASCADE
    );`);
}