const db = require('../db/connection')

exports.fetchCategories = () => {
  const queryString = `
    SELECT * FROM categories;`;
    return db.query(queryString)
    .then((result) => {
        return result.rows
    })
};