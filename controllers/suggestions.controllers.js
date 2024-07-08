const { insertSuggestionByUserId } = require('../models/suggestions.models');

exports.postSuggestionByUserId = (req, res, next) => {
    const suggestionData = req.body
  insertSuggestionByUserId(suggestionData)
    .then((suggestion) => {
      res.status(201).send({ suggestion });
    })
    .catch(next);
};
