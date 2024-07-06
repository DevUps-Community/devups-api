const db = require('../db/connection')

exports.insertSuggestionByUserId = (user_id, body) => {
  const queryString = `
    INSERT INTO suggestions (user_id, body)
    VALUES ($1, $2)
    RETURNING *;`;
    return db.query(queryString, [user_id, body])
   .then((result) => {
      return result.rows[0]
    })
};