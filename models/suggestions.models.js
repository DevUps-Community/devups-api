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
    if (result.rows[0] === 0) {
      return Promise.reject({status: 400, msg: 'Bad request'});
    }
    return result.rows[0];
});
};
