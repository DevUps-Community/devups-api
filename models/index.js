const { fetchCategories } = require('./categories.models');
const { fetchTopics, fetchTopicsByCategoryId } = require('./topics.models');
const { insertSuggestionByUserId } = require('./suggestions.models');

module.exports = {
  fetchCategories,
  fetchTopics,
  fetchTopicsByCategoryId,
  insertSuggestionByUserId
};