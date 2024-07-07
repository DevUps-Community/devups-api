const db = require('../db/connection')

exports.insertSuggestionByUserId = (created_by, content) => {
  const queryString = `
    INSERT INTO suggestions (created_by, content)
    VALUES ($1, $2)
    RETURNING suggestion_id, created_by, content, created_at;`;
    return db.query(queryString, [created_by, content])
   .then((result) => {
      return result.rows[0]
    })
};