const format = require('pg-format');
const db = require('../connection');
const { createTables } = require('./createTables');
const { dropTables } = require('./dropTables');

const seed = async ({ categoryData, topicsData, tagsData, notesData, suggestionsData }) => {
  
  //   await db.query(`DROP TABLE IF EXISTS favourites;`);
  try {
    await dropTables();
    await createTables();

    const catQueryStr = format(
      'INSERT INTO categories(name, description) VALUES %L;',
      categoryData.map(({ name, description }) => [name, description])
    );
    await db.query(catQueryStr);

    const topicQueryStr = format(
      'INSERT INTO topics(name, category_id, description) VALUES %L;',
      topicsData.map(({ name, category_id, description }) => [
        name,
        category_id,
        description,
      ])
    );
    await db.query(topicQueryStr);

    const notesQueryStr = format(
      'INSERT INTO notes(title, content, category_id, topic_id) VALUES %L;',
      notesData.map(({ title, content, category_id, topic_id }) => [
        title,
        content,
        category_id,
        topic_id,
      ])
    );
    await db.query(notesQueryStr);

    const tagsQueryStr = format(
      'INSERT INTO tags(name, note_id) VALUES %L;',
      tagsData.map(({ name, note_id }) => [name, note_id])
    );
    await db.query(tagsQueryStr);

    const suggestionQueryStr = format(
      'INSERT INTO suggestions(name, email, content) VALUES %L;',
      suggestionsData.map(({ name, email, content }) => [name, email, content])
    );
    await db.query(suggestionQueryStr);
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
