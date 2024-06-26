const format = require('pg-format');
const db = require('../connection');
const { createTables } = require('./createTables');
const { dropTables } = require('./dropTables');

const seed = async ({ categoryData, topicsData, tagsData, notesData }) => {
  //   await db.query(`DROP TABLE IF EXISTS suggestions;`);
  //   await db.query(`DROP TABLE IF EXISTS favourites;`);
  try {
    await dropTables();
    await createTables();
    //TODO - INSERT SEED DATA FOR THE NOTES

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

    const tagsQueryStr = format(
      'INSERT INTO tags(name) VALUES %L;',
      tagsData.map(({ name }) => [name])
    );
    await db.query(tagsQueryStr);

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

  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
