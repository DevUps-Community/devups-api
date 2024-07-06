const { insertSuggestionByUserId } = require("../models/suggestions.models")

exports.postSuggestionByUserId = (req, res, next) => {
    const { user_id } = req.params
    const { suggestion } = req.body
    insertSuggestionByUserId(user_id, suggestion)
   .then((suggestion) => {
        res.status(201).send({suggestion})
    }).catch(next)
}