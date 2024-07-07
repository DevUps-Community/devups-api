const { insertSuggestionByUserId } = require("../models/suggestions.models")

exports.postSuggestionByUserId = (req, res, next) => {
    const { created_by, content } = req.body
    insertSuggestionByUserId(created_by, content)
   .then((suggestion) => {
        res.status(201).send({suggestion})
    }).catch(next)
}