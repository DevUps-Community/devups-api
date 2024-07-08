const { getTopics, getTopicsByCategoryId } = require('./topics.controllers');
const { getCategories } = require('./categories.controllers');
const { postSuggestionByUserId } = require('./suggestions.controllers');
const { handle404 } = require('./handle404.controllers');
const { getNoteById, getNotesSummary } = require('./notes.controllers');

module.exports = {
  getCategories,
  getTopics,
  getTopicsByCategoryId,
  postSuggestionByUserId,
  handle404,
  getNoteById,
  getNotesSummary
};
