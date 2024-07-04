const db = require('../db/connection')

exports.fetchCategories = () => {
  const queryString = `
    SELECT * FROM CATEGORIES;`;
    return db.query(queryString)
    .then((result) => {
        return result.rows
    })
};
