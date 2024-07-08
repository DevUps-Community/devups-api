const db = require('../db/connection')

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
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
            return rows
        })
};