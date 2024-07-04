const db = require('../db/connection')

exports.fetchCategories = () => {
  const queryString = `
    SELECT * FROM categories;`;
    return db.query(queryString)
    .then((result) => {
        return result.rows
    })
};

exports.fetchTopics = () => {
  const queryString = `
    SELECT * FROM topics;`;
    return db.query(queryString)
    .then((result) => {
        return result.rows
    })
};

exports.fetchTopicsByCategoryId = (category_id) => {
  const queryString = `
    SELECT * FROM topics WHERE category_id = $1 ORDER BY name ASC;`;
    return db.query(queryString, [category_id])
    .then((result) => {
        console.log(result);
        return result.rows
    })
};
