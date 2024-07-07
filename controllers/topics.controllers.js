const { fetchTopicsByCategoryId, fetchTopics } = require("../models/topics.models")

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics})
    }).catch(next)
}

exports.getTopicsByCategoryId = (req, res, next) => {
    const { category_id } = req.params
    fetchTopicsByCategoryId(category_id)
    .then((topics) => {
        res.status(200).send({topics})
    }).catch(next)
}