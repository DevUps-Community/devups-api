const format = require('pg-format');
const db = require('../db/connection');

exports.insertSuggestionByUserId = (suggestionData) => {
    const queryString = format(
        'INSERT INTO suggestions(name, email, content) VALUES (%L, %L, %L) RETURNING *;',
        suggestionData.name,
        suggestionData.email,
        suggestionData.body
      );
  return db.query(queryString).then((result) => {
    return result.rows[0];
  });
};
