const { getTopics, getTopicsByCategoryId } = require('./topics.controllers');
const { getCategories } = require('./categories.controllers');
const { handle404 } = require('./handle404.controllers');

module.exports = {
  getCategories,
  getTopics,
  getTopicsByCategoryId,
  handle404,
};
